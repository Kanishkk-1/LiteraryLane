
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing the post:", error);
        }
    };

    return (
        <div>
            {/* <Appbar /> */}
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="Title"
                    />

                    <div className="mt-4">
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            theme="snow"
                            modules={editorModules}
                            className="border rounded-lg"
                        />
                    </div>

                    <button
                        onClick={handlePublish}
                        type="button"
                        className="mt-4 px-6 py-2.5 text-white bg-black rounded-lg hover:bg-white hover:text-black border-2 border-black focus:ring-4 focus:ring-blue-300"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

const editorModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
       
        ['clean'] 
    ],
};
