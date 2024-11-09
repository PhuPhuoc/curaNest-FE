"use client";

import { EyeFilledIcon } from "@/app/Icon/EyeFilledIcon";
import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import ImageLogin from "../../../../public/Login.png";
import { EyeSlashFilledIcon } from "@/app/Icon/EyeSlashFilledIcon ";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setLoginError("");

    if (isLogin) {
      if (!email) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (isValid) {
        setLoginError("Invalid email or password");
      }
    } else {
      if (!email) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      }
    }

    if (isValid) {
      console.log("Form is valid");
      router.push("/user/patientProfile");
    } else {
      console.log("Form has errors");
    }
  };

  const handleSubmitNurse = (type: string) => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setLoginError("");

    if (isLogin) {
      if (!email) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (isValid) {
        // Perform login action here
        // For demonstration, we'll just set a login error
        setLoginError("Invalid email or password");
      }
    } else {
      // Validate email
      if (!email) {
        setEmailError("Email is required");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        isValid = false;
      }

      // Validate password
      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      }

      // Validate confirm password
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      }
    }

    if (isValid) {
      console.log("Form is valid");
      if (type === "nurse") {
        router.push("/nurse");
      } else {
        router.push("/admin");
      }
    } else {
      console.log("Form has errors");
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  // const renderRegistrationForm = () => (
  //   <motion.div
  //     initial={{ opacity: 0, x: 20 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: -20 }}
  //     transition={{ duration: 0.5 }}
  //     className="space-y-6"
  //   >
  //     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
  //       Tạo tài khoản
  //     </h2>
  //     <Input
  //       isClearable
  //       label="Email"
  //       variant="bordered"
  //       placeholder="Nhập email"
  //       size="lg"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       color={emailError ? "danger" : "default"}
  //       isInvalid={!!emailError}
  //       errorMessage={emailError}
  //     />
  //     <Input
  //       type={isVisible ? "text" : "password"}
  //       label="Password"
  //       variant="bordered"
  //       placeholder="Nhập password"
  //       size="lg"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       color={passwordError ? "danger" : "default"}
  //       isInvalid={!!passwordError}
  //       errorMessage={passwordError}
  //       endContent={
  //         <button
  //           className="focus:outline-none"
  //           type="button"
  //           onClick={toggleVisibility}
  //         >
  //           {isVisible ? (
  //             <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //           ) : (
  //             <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //           )}
  //         </button>
  //       }
  //     />
  //     <Input
  //       type={isVisible ? "text" : "password"}
  //       label="Confirm Password"
  //       variant="bordered"
  //       placeholder="Confirm your password"
  //       size="lg"
  //       value={confirmPassword}
  //       onChange={(e) => setConfirmPassword(e.target.value)}
  //       color={confirmPasswordError ? "danger" : "default"}
  //       isInvalid={!!confirmPasswordError}
  //       errorMessage={confirmPasswordError}
  //     />
  //     <Button type="submit" color="primary" size="lg" className="w-full">
  //       Sign Up
  //     </Button>
  //   </motion.div>
  // );

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-blue-500 to-blue-200">
      <div className="absolute top-4 left-4 z-20">
        <Link
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-300"
          href="/"
        >
          CURANEST
        </Link>
      </div>
      <Card className="z-10 w-full max-w-5xl h-auto overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-2xl">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex-1 p-8 bg-white flex flex-col justify-center space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Chào mừng bạn đến với
                    <span className="text-lime-500">CURANEST</span>
                  </h2>
                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Nhập email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color={emailError ? "danger" : "default"}
                    errorMessage={emailError}
                    isInvalid={!!emailError}
                    className="mb-4"
                  />
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    placeholder="Nhập password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color={passwordError ? "danger" : "default"}
                    errorMessage={passwordError}
                    isInvalid={!!passwordError}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                  <div className="flex space-x-4 mt-4">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="w-full"
                    >
                      Đăng nhập cho người dùng
                    </Button>
                    <Button
                      onClick={() => handleSubmitNurse("nurse")}
                      color="primary"
                      size="lg"
                      className="w-full"
                    >
                      Đăng nhập cho điều dưỡng
                    </Button>
                    <Button
                      onClick={() => handleSubmitNurse("admin")}
                      color="primary"
                      size="lg"
                      className="w-full"
                    >
                      Đăng nhập cho admin
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Tạo tài khoản
                  </h2>
                  <Input
                    label="Email"
                    variant="bordered"
                    placeholder="Nhập email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color={emailError ? "danger" : "default"}
                    errorMessage={emailError}
                    isInvalid={!!emailError}
                  />
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    placeholder="Nhập password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color={passwordError ? "danger" : "default"}
                    errorMessage={passwordError}
                    isInvalid={!!passwordError}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Confirm Password"
                    variant="bordered"
                    placeholder="Xác nhận password"
                    size="lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    color={confirmPasswordError ? "danger" : "default"}
                    errorMessage={confirmPasswordError}
                    isInvalid={!!confirmPasswordError}
                  />

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full"
                  >
                    Đăng ký
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Bạn chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-blue-600 hover:underline font-semibold"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </button>
          </p>
        </motion.div>

        <div className="flex-1 relative bg-gray-100 p-8 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={ImageLogin}
              alt="Authentication"
              width={500}
              height={500}
              priority={true}
              className="rounded-lg shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
