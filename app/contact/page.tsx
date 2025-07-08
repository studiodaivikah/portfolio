"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import SocialLinks from "../../components/ui/sociallinks";
import Link from "next/link";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const ContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Only 20 characters are allowed"),
  message: z.string().min(8, "A minimum length of 8 characters is required"),
  email: z.string().email("Enter a valid Email"),
});

type FormData = z.infer<typeof ContactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  async function onSubmit(data: FormData) {
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (data.status === 201) {
        setLoading(false);
        toast.success("Sent Successfully");
      } else if (data.status === 402) {
        setLoading(false);
        toast.warning("Send Failed");
      }
    });

    reset();
  }

  return (
    <main className="flex-center flex-col max-w-[2800px] w-full">
      <div className="w-screen border h-[900px] lg:h-[1060px] 2xl:h-[1460px] relative overflow-hidden">
        <Image
          fill
          alt="Contact Background"
          src="/images/contact_img.jpg"
          className="z-0 object-cover"
        />
        <div className="relative z-10 flex -top-64 sm:-top-64 md:-top-72 lg:-top-[360px] 2xl:-top-[520px] items-center justify-center h-full">
          <p className="max-w-[1240px] px-10 text-center text-[16px] sm:text-[20px] md:text-[28px] font-medium text-gray-700 rounded-lg p-6">
            Have a project in mind? A question, idea, or simply want to start a
            conversation? We’d love to hear from you. Whether you&lsquo;re
            looking to collaborate, request a consultation, or just learn more
            about what we do, reach out using the form below or connect with us
            directly. We believe the best designs begin with a simple
            conversation—let’s start one today.
          </p>
        </div>
      </div>

      <section className="flex flex-col items-center max-w-[1240px] px-10 w-full py-10">
        <div className="flex flex-col md:flex-row items-start justify-between mt-5 w-full max-w-[1140px] gap-16">
          <div className="flex-start mt-20 flex-col gap-8 md:mt-0 md:gap-16">
            <div className="flex-start max-w-[336px] flex-col gap-y-5">
              <p className="text-[70px] text-wrap sm:text-[80px] leading-20 sm:text-nowrap md:text-wrap xl:text-[100px] 2xl:text-[130px] font-extrabold text-black md:leading-22 xl:leading-25 2xl:leading-32">
                LET&apos;S TALK
              </p>
              <p className="text-[26px] mt-2 text-gray-700">
                &quot;From repairs to renovations, we’re here for you. Contact
                Studio Daivaikah!
              </p>
            </div>
            <div className="flex-start max-w-[286px] flex-col">
              <p className="h3-bold lg:text-[20px] text-black font-medium">
                Call Us
              </p>
              <Link
                href={`https://wa.me/919344217163?text=Hello Revawe Technologies`}
                className="flex-center mt-2 "
              >
                <p className="body-regular lg:paragraph-regular text-gray-700">
                  +91 75502 37036
                </p>
              </Link>
            </div>
            <div className="flex-start max-w-[286px] flex-col gap-4">
              <p className="h3-bold lg:base-bold text-black">Links</p>
              <div>
                <SocialLinks />
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-start w-full max-w-[500px]"
          >
            <div className="flex items-start justify-start mx-auto max-w-[1140px] w-full flex-col space-y-10 md:space-y-20 2xl:mx-auto ">
              <div className="xs:flex-between xs:space-x-3 xs:space-y-0 w-full max-w-[736px] gap-4 space-y-10">
                <div className="group relative z-0 w-full">
                  <input
                    type="text"
                    className="peer block w-full max-w-[456px] appearance-none border-0 border-b border-b-black bg-transparent px-0 
                  py-4 text-start focus:outline-none focus:ring-0"
                    placeholder=""
                    required
                    {...register("name")}
                  />
                  <label
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-400
                duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium
                rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                  >
                    Your Name
                  </label>
                  <p className="h-2 py-1">
                    {errors.name && (
                      <p className="small-regular text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </p>
                </div>

                <div className="group relative z-0 w-full">
                  <input
                    type="text"
                    className="peer block w-full max-w-[456px] appearance-none border-0 border-b border-b-black bg-transparent 
                  px-0 py-4 text-start focus:outline-none focus:ring-0"
                    placeholder=""
                    required
                    {...register("email")}
                  />
                  <label
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-400
                duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium
                rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                  >
                    Your Email
                  </label>
                  <p className="h-2 py-1">
                    {errors.email && (
                      <p className="small-regular text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex-between w-full max-w-[456px] space-y-10">
                <div className="group relative z-0 w-full">
                  <input
                    type="text"
                    className="peer block w-full max-w-[644px] appearance-none border-0 border-b border-b-black bg-transparent 
                  px-0 py-4 pb-24 text-start focus:outline-none focus:ring-0"
                    placeholder=""
                    required
                    {...register("message")}
                  />
                  <label
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-400
                duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium
                rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                  >
                    Your Message
                  </label>
                  <p className="h-2 py-1">
                    {errors.message && (
                      <p className="small-regular text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </p>
                </div>
              </div>

              {loading ? (
                <button className="paragraph-regular flex-center mt-6 gap-2 bg-black px-4 py-2.5 text-center text-white ring-1 ring-black">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="size-6 animate-spin fill-white text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>{" "}
                  <p className="paragraph-regular">Submit</p>
                </button>
              ) : (
                <button className="paragraph-regular mt-6 bg-black text-white px-8 py-2.5 text-center">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactForm;
