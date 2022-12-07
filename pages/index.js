import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

export default function Home() {
  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const MySwal = withReactContent(Swal);
  const [isLoading, setIsloading] = useState(false);
  const [saveImage, setSaveImage] = useState("/images/fake.png");
  const [tipe, setTipe] = useState(false);
  const [image, setImage] = useState(null);
  const [input, setInput] = useState({
    email: "",
    title: "",
    area: "",
  });

  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
  const handleForm = (e) => {
    setInput((values) => ({
      ...values,
      [e.target.id]: [e.target.value],
    }));
  };

  useEffect(() => {
    const allInputs = document.querySelectorAll("input");
    for (const input of allInputs) {
      input.addEventListener("input", () => {
        const val = input.value;
        if (!val) {
          input.parentElement.classList.add("empty");
        } else {
          input.parentElement.classList.remove("empty");
        }
      });
    }
  });

  function handleUpload(e) {
    let uploaded = e.target.files[0];
    if (!uploaded) {
      setImage("");
    } else {
      setImage(uploaded);
    }

    let tipe = uploaded.type;
    let name = uploaded.name;
    let size = uploaded.size;
    if (tipe === "") {
      setSaveImage("/images/file.png");
      setTipe(true);
    } else {
      setSaveImage(URL.createObjectURL(uploaded));
      setTipe(false);
    }
    const fileSize = (size / 1000).toFixed(2);
    const fileNameAndSize = name + " " + -+" " + fileSize + " KB";
    console.log(fileNameAndSize);
  }

  function uploadData(e) {
    e.preventDefault();
    setIsloading(true);
    function kapital(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    const pathDefault =
      "https://source.unsplash.com/random/?naturehttps://images.unsplash.com/photo-1420593248178-d88870618ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTY3MDM4Njk0Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080";
    const blob = fetch(pathDefault).then((it) => it.blob());
    const file = new File([blob], "defaultFile.jpg", {
      type: "image/jpeg",
      lastModified: new Date(),
    });

    let formData = new FormData();
    const newImage = !image ? file : image;
    formData.append("image", newImage);
    formData.append("email", input.email);
    formData.append("title", kapital(input.title.toString()));
    formData.append("area", input.area);

    console.log(formData);
    fetch("https://mailexpress.onrender.com/api/sendemail", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsloading(false);
          MySwal.fire({
            title: "Berhasil!",

            text: "Send message success :)",

            icon: "success",
          });
        }
      })
      .catch((err) => {
        setIsloading(false);
        MySwal.fire({
          title: "Gagal!",

          text: "Data gagal dikirim",

          icon: "error",
        });
      });
  }
  return (
    <div>
      <Head>
        <title>DKZhen - Mail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/mail.png" />
      </Head>

      <div className="max-w-screen bg-[#F6F6F6] flex justify-between h-screen  ">
        <div className=" flex flex-row justify-center md:px-20 md:py-40  mx-auto md:mx-8 py-10">
          <div
            className={` ${
              !saveImage
                ? "max-w-sm h-[420px] justify-center bg-white shadow-lg rounded-lg overflow-hidden mx-auto flex flex-col p-5 font-roboto"
                : "max-w-sm  justify-center bg-white shadow-lg rounded-lg overflow-hidden mx-auto flex flex-col p-5 font-roboto h-[600px] md:h-[420px]"
            }`}
          >
            <h3 className="text-2xl font-bold">Hello Everyone</h3>
            <p className="mb-4 text-md text-red-400">
              Upload your file in here!
            </p>

            <div className="relative h-10 input-component empty mb-5">
              <input
                id="email"
                type="text"
                name="email"
                onChange={handleForm}
                required
                className="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"
              />
              <label
                htmlFor="email"
                className="absolute left-2 transition-all bg-white px-1"
              >
                Email
              </label>
            </div>

            <div className={`relative h-10 input-component empty mb-5`}>
              <input
                id="title"
                type="text"
                name="title"
                onChange={handleForm}
                className="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"
              />
              <label
                htmlFor="title"
                className="absolute left-2 transition-all bg-white px-1 "
              >
                Fullname
              </label>
            </div>

            <div className="relative h-10 input-component empty">
              <input
                id="area"
                type="text"
                name="area"
                onChange={handleForm}
                className="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"
              />
              <label
                htmlFor="area"
                className="absolute left-2 transition-all bg-white px-1"
              >
                Message
              </label>
            </div>
            <div className="pt-5 pb-5">
              <input
                id="file"
                type="file"
                name="file"
                onChange={handleUpload}
              />
            </div>

            <button
              onClick={uploadData}
              disabled={isLoading}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {isLoading ? "Wait..." : "Submit"}
            </button>
            <div
              className={`${
                !saveImage
                  ? "hidden"
                  : "flex md:hidden flex-col  mx-auto justify-center items-center"
              }`}
            >
              <div className="mt-5  flex mx-auto justify-center items-stretch px-2  border-2 border-black rounded-lg ">
                <Image
                  className="w-[150px] h-[150px] object-contain"
                  src={saveImage}
                  alt="preview"
                  width={150}
                  height={150}
                />
              </div>
              <div className="mt-2">
                Your preview {!tipe ? "Image" : "File"} in here :){" "}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col pl-5 font-roboto text-3xl font-bold">
            <p>Dont let</p> <p>feedback slow</p>
            <p>you down</p>
            <p className="text-lg font-normal">
              Now you can send anything in here
            </p>
          </div>
        </div>
        <div className="hidden lg:flex ml-20">
          <Image
            className=" rounded-tl-full rounded-bl-full"
            src={`${
              saveImage
                ? "/images/photo1.jpeg"
                : "/images/photo${random_item(item)}.jpeg"
            }`}
            width={384}
            height={384}
            alt="hero"
          />
        </div>
      </div>
    </div>
  );
}
