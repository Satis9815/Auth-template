import { connectDb } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody =await request.json();
        const {username,email,password} = reqBody;

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User already Exist"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser =   new User({
                username,
                email,
                password:hashedPassword
            });
        const savedUser = await newUser.save();

        // send Email 
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
        return NextResponse.json({
            message:"User Registered Successfully",
            success:true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }

}