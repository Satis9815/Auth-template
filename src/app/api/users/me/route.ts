import { connectDb } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDb();

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");

        if(!user){
            return NextResponse.json({message:"User doesn't exist"},{status:404});
        }
        return NextResponse.json({user});

        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }
    
}
