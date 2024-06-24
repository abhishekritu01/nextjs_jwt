import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


Connect();


//logout
export async function GET(request: NextRequest) {
    try {
        const reponse = NextResponse.json({
            status: "success",
            message: "User logged out successfully",
        });

        reponse.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),

        });

        return reponse;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}

