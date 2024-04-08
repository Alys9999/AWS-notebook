import type { MetaFunction } from "@remix-run/node";
import { useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Fovus" },
    { name: "description", content: "Fovus" },
  ];
};

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <form ref={formRef} method="post" encType="multipart/form-data" onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex mb-4 flex-row">
          <label htmlFor="textInput" className="block text-sm font-medium text-gray-700 min-w-20 justify-center align-middle">Text Input:</label>
          <input type="text" id="textInput" name="textInput" required className="block w-full shadow-sm sm:text-sm border-zinc-500 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">File Input:</label>
          <input type="file" id="fileInput" name="fileInput" required className="block w-full shadow-sm sm:text-sm border-zinc-500 rounded-md" />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </form>
      
      
    </div>
  );
}


