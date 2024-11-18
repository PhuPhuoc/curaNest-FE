"use client";

import { EyeFilledIcon } from "@/app/Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/Icon/EyeSlashFilledIcon";
import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import ImageLogin from "../../../../public/Login.png";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authApiRequest from "@/apiRequests/auth";
import { useAppContext } from "@/app/app-provider";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  //field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const { setUser, setAccount,user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const dataAccount ={email, password};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");

    if (isLogin) {
      if (!email) {
        setEmailError("Vui lòng nhập email");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Vui lòng nhập đúng đinh dạng email");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Vui lòng nhập mật khẩu");
        isValid = false;
      }
    } else {
      if (!name) {
        setNameError("Vui lòng nhập tên");
        isValid = false;
      }
      if (!email) {
        setEmailError("Vui lòng nhập email");
        isValid = false;
      } else if (!validateEmail(email)) {
        setEmailError("Vui lòng nhập đúng đinh dạng email");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Vui lòng nhập mật khẩu");
        isValid = false;
      }

      if (!confirmPassword) {
        setConfirmPasswordError("Vui lòng nhập xác nhận mật khẩu");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Mật khẩu không trùng khớp");
        isValid = false;
      }
    }

    if (loading) return;
    setLoading(true);

    if (isValid) {
      if (isLogin) {
        try {
          const valuesLogin = { email, password };
          const result = await authApiRequest.login(valuesLogin);
          toast.success(`Chào mừng đăng nhập ${result.payload.data.user_name}`);
          setUser(result.payload.data);
          setAccount(dataAccount);
          document.cookie = `userRole=${result.payload.data.role}; path=/; max-age=86400; secure; samesite=strict`;

          switch (result.payload.data.role) {
            case "admin":
              router.push("/admin");
              break;
            case "nurse":
              router.push("/nurse");
              break;
            case "user":
              router.push("/user/customerRegister");
              break;
            case "customer":
              router.push("/user");
              break;
            default:
              router.push("/");
          }
        } catch (error: any) {
          setLoading(false);
          if (error.payload.log.includes("user does not exist")) {
            setEmailError("Người dùng không tồn tại");
          } else if (error.payload.log.includes("wrong password")) {
            setPasswordError("Sai mật khẩu");
          } else {
            toast.error(error.payload.log);
          }
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const valuesRegister = {
            email,
            password,
            name,
            confirm_password: confirmPassword,
          };

          const result = await authApiRequest.register(valuesRegister);
          // toast.success(`${result.payload.message}`);
          setIsLogin(true);
        } catch (error: any) {
          setLoading(false);
          if (error.payload.log.includes("email already exists")) {
            setEmailError("Email đã tồn tại");
          } else {
            toast.error(error.payload.log || "Đăng ký thất bại");
          }
        } finally {
          setLoading(false);
        }
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
    setName("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");
  };

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
      <Card className="z-10 w-full max-w-7xl h-auto overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-2xl">
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
                    label="Mật khảu"
                    variant="bordered"
                    placeholder="Nhập mật khẩu"
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
                      Đăng nhập
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
                    label="Tên người dùng"
                    variant="bordered"
                    placeholder="Nhập tên người dùng"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    color={nameError ? "danger" : "default"}
                    errorMessage={nameError}
                    isInvalid={!!nameError}
                  />
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
                    label="Mật khẩu"
                    variant="bordered"
                    placeholder="Nhập mật khẩu"
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
                    label="Xác nhận mật khẩu"
                    variant="bordered"
                    placeholder="Nhập xác nhận mật khẩu"
                    size="lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    color={confirmPasswordError ? "danger" : "default"}
                    errorMessage={confirmPasswordError}
                    isInvalid={!!confirmPasswordError}
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
          <AnimatePresence>
            <motion.div
              key={isLogin ? "login-image" : "register-image"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <Image
                src={ImageLogin}
                alt="Authentication"
                objectFit="cover"
                priority={true}
                className="rounded-2xl shadow-lg scale-95"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
