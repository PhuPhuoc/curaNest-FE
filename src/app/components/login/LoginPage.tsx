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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [userType, setUserType] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleUserTypeSelection = (type: string) => {
    setUserType(type);
    setShowRegistrationForm(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    // Reset all error states
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");
    setLoginError("");

    if (isLogin) {
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

      // Validate phone number for nurse registration
      if (userType === "nurse") {
        if (!phoneNumber) {
          setPhoneNumberError("Phone number is required");
          isValid = false;
        } else if (!validatePhoneNumber(phoneNumber)) {
          setPhoneNumberError("Please enter a valid 10-digit phone number");
          isValid = false;
        }
      }
    }

    if (isValid) {
      console.log("Form is valid");
      // Perform login or signup action here
      // If successful, then redirect
      router.push("/user");
    } else {
      console.log("Form has errors");
    }
  };

  const handleSubmitNurse = () => {
    let isValid = true;

    // Reset all error states
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");
    setLoginError("");

    if (isLogin) {
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

      // Validate phone number for nurse registration
      if (userType === "nurse") {
        if (!phoneNumber) {
          setPhoneNumberError("Phone number is required");
          isValid = false;
        } else if (!validatePhoneNumber(phoneNumber)) {
          setPhoneNumberError("Please enter a valid 10-digit phone number");
          isValid = false;
        }
      }
    }

    if (isValid) {
      console.log("Form is valid");
      // Perform login or signup action here
      // If successful, then redirect
      router.push("/nurse");
    } else {
      console.log("Form has errors");
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");
    setUserType("");
    setShowRegistrationForm(false);
  };

  const renderUserTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Chọn loại tài khoản
      </h2>
      <Button
        color="primary"
        size="lg"
        className="w-full"
        onClick={() => handleUserTypeSelection("user")}
      >
        Người dùng
      </Button>
      <Button
        color="secondary"
        size="lg"
        className="w-full"
        onClick={() => handleUserTypeSelection("nurse")}
      >
        Điều dưỡng
      </Button>
    </motion.div>
  );

  const renderRegistrationForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Tạo {userType === "nurse" ? "Nurse" : "User"} tài khoản
      </h2>
      <Input
        isClearable
        label="Email"
        variant="bordered"
        placeholder="Nhập email"
        size="lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        color={emailError ? "danger" : "default"}
        isInvalid={!!emailError}
        errorMessage={emailError}
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
        isInvalid={!!passwordError}
        errorMessage={passwordError}
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
        placeholder="Confirm your password"
        size="lg"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        color={confirmPasswordError ? "danger" : "default"}
        isInvalid={!!confirmPasswordError}
        errorMessage={confirmPasswordError}
      />
      {userType === "nurse" && (
        <Input
          type="tel"
          label="Phone Number"
          variant="bordered"
          placeholder="Enter your phone number"
          size="lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          color={phoneNumberError ? "danger" : "default"}
          isInvalid={!!phoneNumberError}
          errorMessage={phoneNumberError}
        />
      )}
      <Button type="submit" color="primary" size="lg" className="w-full">
        Sign Up
      </Button>
    </motion.div>
  );

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
                    Chào mừng bạn đến với{" "}
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
                      onClick={() => handleSubmitNurse()}
                      color="primary"
                      size="lg"
                      className="w-full"
                    >
                      Đăng nhập cho điều dưỡng
                    </Button>
                  </div>
                </motion.div>
              ) : showRegistrationForm ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Tạo {userType === "nurse" ? "Nurse" : "User"} tài khoản
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
                  {userType === "nurse" && (
                    <Input
                      type="tel"
                      label="Phone Number"
                      variant="bordered"
                      placeholder="Nhập số điện thoại"
                      size="lg"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      color={phoneNumberError ? "danger" : "default"}
                      errorMessage={phoneNumberError}
                      isInvalid={!!phoneNumberError}
                    />
                  )}
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full"
                  >
                    Đăng ký
                  </Button>
                </motion.div>
              ) : (
                renderUserTypeSelection()
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
