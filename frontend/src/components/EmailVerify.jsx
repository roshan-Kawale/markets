import React, { useEffect, useState } from "react";
import { userAtom } from "../atoms/store";
import { useAtom } from "jotai";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { HomeIcon } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="container mx-auto mt-32">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img
              src="/assets/placeholder.svg?height=200&width=400"
              alt="404 Not Found"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-muted-foreground">
            Oops! The page you're looking for seems to have wandered off.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/signup">
            <Button className="w-full sm:w-auto">
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

const EmailVerifyCard = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="container mx-auto mt-32">
      <Card className="w-[350px] mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verified</CardTitle>
          <CardDescription>
            Your email has been successfully verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for verifying your email address. You can now access all
            features of your account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          {user.role === "shopkeeper" && (
            <Link to="/detail">
              <Button className="w-full">Go to DetailPage</Button>
            </Link>
          )}
          {user.role === "consumer" && (
            <Link to="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

function EmailVerify() {
  const [user, setUser] = useAtom(userAtom);

  const [validUrl, setValidUrl] = useState(true);
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/auth/user/${id}/verify/${token}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success !== false) {
          setUser(data);
        }
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, []);

  return (
    <div>
      {validUrl ? (
        <div>
          <EmailVerifyCard />
        </div>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </div>
  );
}

export default EmailVerify;
