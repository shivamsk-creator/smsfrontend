import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

const StudenDocument = ({ open, handleDocumentOpen, item }) => {

    const handleDownload = (imageURL) => {
        // Create an anchor element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = 'image.jpg';

        // Simulate a click on the anchor element
        downloadLink.click();
    };
    return (
        <Dialog open={open} handler={handleDocumentOpen}
        >
            <DialogHeader>Student Documents</DialogHeader>
            <DialogBody divider>
                <div className='flex items-center'>
                    <div className="w-1/2 px-3 mb-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="idCard"
                        >
                            Aadhar card / PAN card
                        </label>

                    </div>
                    <div className="w-1/2 px-3 mb-3">
                        <div className="relative">

                            <img className='w-full h-32' src="https://adarshc.com/index/ent/document/default/aadhar.jpg" alt="aadhar Card" />

                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <Button variant="gradient" color="green" onClick={() => handleDownload("https://adarshc.com/index/ent/document/default/aadhar.jpg")}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-1/2 px-3 mb-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="idCard"
                        >
                            Uploaded 10th Marksheet
                        </label>

                    </div>
                    <div className="w-1/2 px-3 mb-3">
                        <div className="relative">
                            <img className='w-full h-40' src="https://pradhanmantriyojana.co.in/wp-content/uploads/2016/05/CBSE-10-and-12-marksheets-online-using-Digilocker.jpg" alt="10th Marksheet" />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <Button variant="gradient" color="green">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </span>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-full md:w-1/2 px-3 mb-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="idCard"
                        >
                            Uploaded 12th Marksheet
                        </label>

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-3">
                        <div className="relative">
                            <img className='w-full h-40' src="https://image.slidesharecdn.com/eca44c41-7836-4c28-b41f-b0f1c7e263dc-150525020403-lva1-app6891/85/12th-mark-sheet-cbse-1-320.jpg?cb=1666096744" alt="12th Marksheet" />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <Button variant="gradient" color="green">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </span>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="outlined"
                    color="red"
                    onClick={handleDocumentOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
            </DialogFooter>
        </Dialog>

    )
}

export default StudenDocument