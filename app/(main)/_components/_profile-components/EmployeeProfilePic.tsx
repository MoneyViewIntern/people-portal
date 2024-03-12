import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDownload } from '@/hooks/use-download';

export default function EmployeeProfilePic({ defaultPfp, avatarPfp }) {

    const [selectedImage, setSelectedImage] = useState('default');  // useState for displaying current image
    const [avatarPofilePic, setAvatarPofilePic] = useState(avatarPfp); // useState for changing avatar image
    const [currentUser, setCurrentUser] = useState('jay'); // usestate for current user
    const [userSwitched, setUserSwitched] = useState(false); // bachodi

    const handleDownload = useDownload().onOpen;

    //usestate for swtuching image auto
    useEffect(() => {
        // Automatically switch the image to avatar after 10 seconds
        const switchToAvatar = setTimeout(() => {
            if (!userSwitched) {
                setSelectedImage('avatar');
            }
        }, 100);

        // Automatically switch the image back to default after 20 seconds
        const switchToDefault = setTimeout(() => {
            if (!userSwitched) {
                setSelectedImage('default');
            }
        }, 100);

        // Clean up the timeouts
        return () => {
            clearTimeout(switchToAvatar);
            clearTimeout(switchToDefault);
        };
    }, [userSwitched]);

    const toggleImage = () => {
        setSelectedImage(selectedImage === 'default' ? 'avatar' : 'default');
        setUserSwitched(true);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPofilePic(reader.result); // Update avatarPofilePic with the uploaded image
            };
            reader.readAsDataURL(file);
            setUserSwitched(true);
        }
    };

    const handleProfilePicClick = () => {
        if( avatarPofilePic){
            toggleImage();
        }
    };

    let x = 'Arihant Aghnihotri';

    return (
        <main style={{ display: 'flex', alignItems: 'center' , }}>
            <div style={{ marginRight: '4vh' , marginLeft: '4vh'  }}>
                <Image
                    src={(selectedImage === 'default' ? defaultPfp : avatarPofilePic)}
                    alt="Profile Pic"
                    width={150}
                    height={150}
                    onClick={handleProfilePicClick}
                    style={{ cursor: 'pointer', objectFit: 'cover', borderRadius: '5px'}}
                />
            </div>
            <div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'beige' , marginBottom:'2vh'}}>{x}</h2>
                <div style={{ display: 'flex' }}>
                    <a href="https://moneyview.slack.com/team/U06L8R4G2DU" target="_blank" rel="noopener noreferrer" style={{marginRight:'1vh'}}>
                        <img src="/images/slack.png" alt="Slack icon" style={{ width: '40px', height: '40px' }} />
                    </a>

                    <a href="https://maps.app.goo.gl/xT5QXzthkjNQMkQs7" target="_blank" rel="noopener noreferrer" style={{marginRight:'1vh'}}>
                        <img src="/images/map.png" alt="Slack icon" style={{ width: '40px', height: '40px' }} />
                    </a>

                    <button onClick={handleDownload}>download</button>
                </div>
            </div>
        </main>


    );
}





