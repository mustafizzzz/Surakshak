import React, { useState } from 'react'
import Lottie from 'react-lottie'
import RegisterPic from '../assets/register.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalSignUp = () => {
    const DefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: RegisterPic,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [helpline, setHelpline] = useState("");
    const [regisnum, setRegisnum] = useState("");
    const [password, setPassword] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length < 3) {
            toast.error("Name must contain atleast 3 characters")
        } else if (password.length < 5) {
            toast.error("Password must contain atleast 6 characters")
        }
        //http://3.108.219.67:5000/
        setLoading(true);
        getLocation();
        console.log(name, email, address, helpline, regisnum, password, latitude, longitude);

        try {
            const response = await axios.post("https://surakshak-apis.onrender.com/api/v1/hospital/signup", {
                name,
                email,
                address,
                phone: helpline,
                regNo: regisnum,
                password,
                latitude,
                longitude

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            if (response.status === 200) {
                const resp = response.data; // Directly access the response data
                toast.success("Your Registration Successful");
                localStorage.setItem("token", resp.token);
                localStorage.setItem("type", 'hospital');
                alert("Registration Successful");
                navigate('/');
            } else {
                alert("Some error occurred");
            }

        } catch (err) {
            console.log(err);
            alert("Something Went Wrong");
        } finally {
            setLoading(false); // Stop loading state
        }
    }

    //get location
    // Function to get the user's current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                },
                (error) => {
                    toast.error("Unable to retrieve your location");
                    console.error("Error retrieving location: ", error);
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser");
        }
    };
    return (
        <div className='grid grid-cols-2 bg-gray-50'>
            <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen pl-28 lg:py-0">
                {/* <h2 className='text-teal-400 font-bold text-3xl mb-4'>Logo</h2> */}
                <div className="w-[600px] bg-white rounded-lg drop-shadow-lg">
                    <div className="space-y-2 py-8 px-10">
                        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-teal-400 md:text-2xl">
                            Sign Up as Hospital
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4" action="#">
                            <div>
                                <label for="name" className="block mb-1 text-base font-medium text-gray-900">Hospital name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your name" required="" />
                            </div>
                            <div>
                                <label for="helpline" className="block mb-1 text-base font-medium text-gray-900">Helpline number</label>
                                <input value={helpline} onChange={(e) => setHelpline(e.target.value)} type="text" name="helpline" id="helpline" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your helpline number" required="" />
                            </div>
                            <div>
                                <label for="email" className="block mb-1 text-base font-medium text-gray-900">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@example.com" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-1 text-base font-medium text-gray-900">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                            </div>
                            <div>
                                <label for="register" className="block mb-1 text-base font-medium text-gray-900">Unique Registration number</label>
                                <input value={regisnum} onChange={(e) => setRegisnum(e.target.value)} type="text" name="regisnum" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Hospital's unique registration number" required="" />
                            </div>
                            <div>
                                <label for="addres" className="block mb-1 text-base font-medium text-gray-900">Address</label>
                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="password" placeholder="Write your address..." rows={2}
                                    cols={40} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                            </div>

                            <button type="submit" className={`w-full text-white font-medium rounded-lg text-base px-5 py-2.5 text-center focus:ring-4 focus:outline-none 
                             focus:ring-primary-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-400 hover:bg-teal-500'}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing Up' : 'Sign Up'}
                            </button>
                            <p className="text-base font-normal text-gray-800">
                                Alreay have an account ? <a href="/login" className="font-medium text-lg text-teal-500 hover:underline ">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mt-16 mr-28'>
                <Lottie options={DefaultOptions} height={650} width={650} />
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    )
}

export default HospitalSignUp