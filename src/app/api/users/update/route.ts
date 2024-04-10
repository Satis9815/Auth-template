import { connectDb } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDb();

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json();
        const {username,email} = reqBody;
        const userId = await getDataFromToken(request);
        const user = await User.findByIdAndUpdate({_id:userId},{
            $set:{
                username:username,
                email:email
                
            }
        },{new:true}).select("-password");
        return NextResponse.json({user});

        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }
    
}
