import { useState } from "react";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ThemeCard = ({ imgUrl, onSelectedTheme, selected }) => {
    return (
        <div className="col-md-6 p-2 card-theme">
            <div
                className={`rounded shadow-sm  ${selected && ' selected'}`}
                style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "cover" }}
                onClick={onSelectedTheme}
            >
            </div>
        </div>
    );
};


const themes = [
    { id: "1", imgUrl: "img/1.avif" },
    { id: "2", imgUrl: "img/2.jpg" },
    { id: "3", imgUrl: "img/3.jpg" },
    { id: "4", imgUrl: "img/4.jpg" },
];


function Home() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [link,setLink] = useState('')
    const [image, setImage]= useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const [selectedTheme, setSelectedTheme] = useState("");

    const handleThemeSelection = (theme) => {
        setSelectedTheme(theme);
    };

    const handleTitleChange = event => setTitle(event.target.value)
    const handleAuthorChange = event => setAuthor(event.target.value)
    const handleMessageChange = event => setMessage(event.target.value)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        // Tambahkan kode untuk menampilkan preview gambar
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const getData = async (e) =>{
        e.preventDefault()
        setIsSubmitting(true);
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

        // Kirim data ke Firebase Realtime Database bersama dengan URL gambar
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                message,
                imageUrl,
                selectedTheme
            }),
        };

        const res = await fetch('https://gitf-card-dfbae-default-rtdb.firebaseio.com/GiftData.json', options)
        console.log(res);
        if (res){
            alert('Msg Sent')
            const responseData = await res.json()
            console.log(responseData.name);
            setLink(`https://gift-card-mauve.vercel.app/${responseData.name}`)
            setTitle('')
            setAuthor('')
            setMessage('')
            setImage(null)
        }else{
            alert('Error')
        }
        setIsSubmitting(false); 

    }

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                console.log('Link berhasil disalin ke clipboard');
                setCopySuccess(true); 
                setTimeout(() => {
                    setCopySuccess(false); 
                }, 2000);
            })
            .catch((err) => {
                console.error('Gagal menyalin link ke clipboard', err);
            });
    };
    

    return (
        <>
            <h1 className="text-center text-primary fs-4 mt-5 mb-4 fw-bold">Gift Card 💌</h1>
            <form className="col-md-6 m-auto p-4 fs-14 ">
                <div className="mb-2">
                    <input type="text"id="title" className="pb-2" placeholder="Judul" value={title} onChange={handleTitleChange} />
                </div>
                <div className="mb-4 col-6">
                    <input type="text" className=" fs-12 pb-2" id="pengirim" placeholder="Nama Pengirim" value={author} onChange={handleAuthorChange}/>
                </div>
                <div className="mb-4 position-relative ">
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="d-none" />
                    <label htmlFor="image" className="btn border w-100 overflow-hidden d-flex justify-content-center align-items-center"  style={{height:'200px'}}>
                        <div className="text-center text-secondary">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="img-preview img-fluid" />
                            ) : (
                                <div>
                                    <i className="bi bi-image fs-3"></i>
                                    <p className="mb-0">Select Image</p>
                                </div>
                            )}
                        </div>
                    </label>
                </div>

                <div className="mb-4 theme row">
                    <label htmlFor="" className="fw-bold text-secondary">Tema</label>
                    {
                        themes.map((theme)=>
                            <ThemeCard key={theme.id} imgUrl={theme.imgUrl} onSelectedTheme = {() => handleThemeSelection(theme.id)} selected={selectedTheme === theme.id} />
                        )
                    }


                </div>
    
                <div className="mb-3">
                    <textarea className="fs-14 border-bottom" id="isi-pesan" placeholder="Pesan..." value={message} onChange={handleMessageChange}></textarea>
                </div>
        
                <button type="button"  className="btn w-100 btn-primary submit-button" onClick={getData} disabled={!title || !message || !selectedTheme || isSubmitting}>Generate Link</button>
                {
                    link && 
                    <div className="mb-3 mt-4 position-relative">
                        <i className={`bi ${copySuccess ? 'bi-check2' : 'bi-clipboard-fill'} position-absolute text-secondary btn-copy`} onClick={handleCopy}></i>
                        <label htmlFor="generated-link" className="form-label fs-12 fw-bold">Generated Link</label>
                        <p className="p-2 bg-white pe-5 position-relative">
                            <code>{link}</code>
                        </p>
                    </div>
                }
                
            </form>
        </>
    );
}

export default Home;
