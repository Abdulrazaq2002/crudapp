import React from "react";

export default function PostHook() {
  const sendMessage = async ({ name, message, auther }) => {
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          message,
          auther,
        }),
      });
      console.log("Details Send Successfully", res);
      if (res.error) {
        console.log(res.error);
      }
    } catch (error) {
      console.log("error at post-hook", error.message);
    }
  };
  return { sendMessage };
}
