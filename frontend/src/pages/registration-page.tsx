import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { PageFooter } from "src/components/page-footer";
import { useAccessToken } from "src/hooks/useAccessToken";
import { apiCall } from "src/utils/api-call";
import { useApi } from "src/hooks/useApi";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "src/components/page-loader";

interface FormData {
  first_name: string;
  last_name: string;
  contact_number: string;
  profile_picture_url: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  profile_picture_url?: string;
}

export const RegistrationPage: React.FC = () => {
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    contact_number: "",
    profile_picture_url: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const userInfo = useApi({
    endpoint: "user-info/me",
  });
  // TODO: return back to the original page if user is already registered
  if (userInfo.data) {
    console.log("User already registered:", userInfo.data);
    navigate("/");
  }
  if (userInfo.loading) {
    return <PageLoader />;
  }

  // if (userInfo.error) {
  //   console.error("Error getting user info", userInfo.error.message);
  // }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // if (name === "profile_picture_url" && files) {
    //   setFormData({ ...formData, [name]: files[0] });
    // } else {
    setFormData({ ...formData, [name]: value });
    // }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.contact_number)) {
      newErrors.contact_number = "Please enter a valid phone number";
    }

    // if (!formData.profile_picture_url) {
    //   newErrors.profile_picture_url = "Profile picture is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("Form submitted:", formData);
    e.preventDefault();
    if (validateForm()) {
      const registerData = formData;
      registerData.profile_picture_url = `https://avatar.iran.liara.run/username?username=${registerData.first_name}+${registerData.last_name}`;
      console.log("Form submitted:", registerData);
      try {
        const res = await apiCall({
          endpoint: "user-info/create",
          method: "POST",
          bodyData: registerData,
          accessToken,
        });
        setFormData({
          first_name: "",
          last_name: "",
          contact_number: "",
          profile_picture_url: "",
        });
        // TODO: show success message and navigate to the original page
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-teal-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-lg">
          <CardHeader className="pb-5">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Sign up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Please enter your details. We will then verify your information.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-gray-700">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className={`border-gray-300 focus:border-teal-500 focus:ring-teal-500 ${
                    errors.first_name ? "border-red-500" : ""
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className={`border-gray-300 focus:border-teal-500 focus:ring-teal-500 ${
                    errors.last_name ? "border-red-500" : ""
                  }`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>

              <div className="space-y-2 pb-5">
                <Label htmlFor="contact_number" className="text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="+44"
                  className={`border-gray-300 focus:border-teal-500 focus:ring-teal-500 ${
                    errors.contact_number ? "border-red-500" : ""
                  }`}
                />
                {errors.contact_number && (
                  <p className="text-red-500 text-sm">
                    {errors.contact_number}
                  </p>
                )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="profile_picture_url" className="text-gray-700">
                  Profile Picture
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="profile_picture_url"
                    name="profile_picture_url"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("profile_picture_url")?.click()
                    }
                    className={`w-full border-gray-300 text-gray-700 hover:bg-gray-100 ${
                      errors.profile_picture_url ? "border-red-500" : ""
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Picture
                  </Button>
                  {formData.profile_picture_url && (
                    <span className="text-sm text-gray-600">
                      {formData.profile_picture_url.name}
                    </span>
                  )}
                </div>
                {errors.profile_picture_url && (
                  <p className="text-red-500 text-sm">
                    {errors.profile_picture_url}
                  </p>
                )} </div> */}

              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              >
                Register
              </Button>
            </form>

            <p className="mt-4 text-xs text-gray-500 text-center">
              This site is protected by reCAPTCHA Enterprise and the Google{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </CardContent>
        </Card>
      </div>
      <PageFooter />
    </div>
  );
};
