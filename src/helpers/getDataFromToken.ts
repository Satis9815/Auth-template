import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (requets:NextRequest)=>{
    try {
        const token = requets.cookies.get("token")?.value || "";
        const decodedData:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        const userId = decodedData.id;
        return userId;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        
    }
}