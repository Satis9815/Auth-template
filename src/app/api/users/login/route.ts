import { connectDb } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request:NextRequest) {
    try {
        const reqBody =await request.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User Doestn't exist"},{status:400});
        }

        const verifyPassword = await bcrypt.compare(password,user.password);

        if(!verifyPassword){
            return NextResponse.json({error:"Invalid credentials"},{status:400});
        }

        const data = {
            id:user._id,
            email:user.email,
            username:user.username
        }
        const token = jwt.sign(data,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Logged In successfully",
            success:true
        });

        response.cookies.set("token",token,{httpOnly:true});

        return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        
    }
    
}