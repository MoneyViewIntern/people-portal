"use client";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WelcomePage = () => {
  const { currentUser } = useAuthContext(); // Access currentUser from the auth context
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (currentUser) {
        router.push(`/user/${currentUser}`);
      } else {
        // Redirect to login or another page if currentUser is not available
        router.push('/login');
      }
    }, 2000);
    return () => clearTimeout(redirectTimer);
  }, [router, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <h1 className="font-bold  text-4xl md:text-5xl">
          Hello {currentUser}, welcome back!
        </h1>
        <p className="text-lg md:text-xl text-green-300 text-gray-600 mt-2">
          It's great to have you here.
        </p>
      </div>
      <div style={{ height: "auto", textAlign: "center"}} className="text-green-400">
        <svg
          style={{height:"300px"}}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 80 80"
        >
          <defs>
            <clipPath id="circleClip">
              <circle cx="40" cy="40" r="30" />
            </clipPath>
          </defs>

          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
          />

          <g clipPath="url(#circleClip)">
            <path
              transform="translate(0, 20)"
              d="M22.026 37.678c-.244 2.958-.838 4.653.787 5.849.297.532.89 1.06.89-1.08 0-2.675 4.77-6.065 6.028-8.973 1.258-2.908-2.097-3.34-4.298-4.587-2.201-1.246-4.642.898-5.38-1.429-.739-2.326 1.38-4.42 4.49-6.181 3.109-1.762-.368-5.002 2.62-5.002 2.987 0 4.542-4.985 5.258-9.14.716-4.154-5.678-7.544-10.395-7.095C17.31.489 11.405 9.744 11.23 11.29c-.175 1.545-2.568 1.013-6.394 1.18-3.826.166-.35 6.364 2.393 4.885s4.647 1.08 5.067 4.77c.419 3.688 5.608 6.363 6.638 6.363 1.031 0 2.376 1.13 2.08 3.008-.298 1.878 1.257 3.224 1.012 6.182ZM40.614 17.479c0 2.234-2.75 1.63-2.68 5.035-2.321 3.876-1.107 6.294.858 6.896 1.965.603 3.036 1.277 4.197 5.94 1.16 4.663 4.34 1.4 5.376-1.029 1.036-2.428.982-9.697 4.215-7.747 3.232 1.95 7.126 1.028 9.823 1.028s5.911-5.815 6.161-7.092c.25-1.276 2.733-4.716 5.858-5.567 3.126-.85 2.322-2.553 0-3.811-2.322-1.26-9.465.602-10.68-2.802-1.214-3.404-4.947-2.11-7.572.62-2.626 2.731-4.876 3.086-10.056 2.182-5.179-.905-5.5 4.113-5.5 6.347Z"
              fill="currentColor"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0, 20"
                to="-80, 20"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            <path
              transform="translate(80, 20)"
              d="M22.026 37.678c-.244 2.958-.838 4.653.787 5.849.297.532.89 1.06.89-1.08 0-2.675 4.77-6.065 6.028-8.973 1.258-2.908-2.097-3.34-4.298-4.587-2.201-1.246-4.642.898-5.38-1.429-.739-2.326 1.38-4.42 4.49-6.181 3.109-1.762-.368-5.002 2.62-5.002 2.987 0 4.542-4.985 5.258-9.14.716-4.154-5.678-7.544-10.395-7.095C17.31.489 11.405 9.744 11.23 11.29c-.175 1.545-2.568 1.013-6.394 1.18-3.826.166-.35 6.364 2.393 4.885s4.647 1.08 5.067 4.77c.419 3.688 5.608 6.363 6.638 6.363 1.031 0 2.376 1.13 2.08 3.008-.298 1.878 1.257 3.224 1.012 6.182ZM40.614 17.479c0 2.234-2.75 1.63-2.68 5.035-2.321 3.876-1.107 6.294.858 6.896 1.965.603 3.036 1.277 4.197 5.94 1.16 4.663 4.34 1.4 5.376-1.029 1.036-2.428.982-9.697 4.215-7.747 3.232 1.95 7.126 1.028 9.823 1.028s5.911-5.815 6.161-7.092c.25-1.276 2.733-4.716 5.858-5.567 3.126-.85 2.322-2.553 0-3.811-2.322-1.26-9.465.602-10.68-2.802-1.214-3.404-4.947-2.11-7.572.62-2.626 2.731-4.876 3.086-10.056 2.182-5.179-.905-5.5 4.113-5.5 6.347Z"
              fill="currentColor"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="80, 20"
                to="0, 20"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WelcomePage;
