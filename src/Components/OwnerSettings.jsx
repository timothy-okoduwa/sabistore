import React, { useState, useEffect } from 'react';
import '../pages/Settings/Settings.css';
import { GoVerified } from 'react-icons/go';
import { db, auth, storage } from '../firebase';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import CircularProgress from '@mui/material/CircularProgress';
const OwnerSettings = () => {
  const [user, setUser] = useState({});
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [storeBio, setStoreBio] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [storeCurrency, setStoreCurrency] = useState('');
  const [adimg, setAdimg] = useState([]);
    const [isImageSelected, setIsImageSelected] = useState(false);
  const [businessNameExists, setBusinessNameExists] = useState(false);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    loading: false,
 
  });
  const [info2, setInfo2] = useState({
    loading2: false,
 
  });
  const { loading } = info;
  const { loading2 } = info2;


  const duration = moment.duration(
    moment() - moment(user?.createdAt?.toDate())
  );

  // Format the duration as a string with the appropriate units
  let formattedDuration = '';
  if (duration.asDays() < 1) {
    formattedDuration = `${Math.round(duration.asHours())}h`;
  } else if (duration.asDays() < 30) {
    formattedDuration = `${Math.round(duration.asDays())}d`;
  } else if (duration.asDays() < 365) {
    formattedDuration = `${Math.round(duration.asMonths())}m`;
  } else {
    formattedDuration = `${Math.round(duration.asYears())}y`;
  }



const ADCover = async () => {
  setInfo({ ...info, error: null, loading: true, });
  setInfo2({ ...info, error: null, loading2:true });
  const imgRef = ref(
    storage,
    `adsimages/${new Date().getTime()} - ${adimg.name}`
  );
  try {
    if (user.adsCoverPath) {
      await deleteObject(ref(storage, user.adsCoverPath));
    }
    const snap = await uploadBytes(imgRef, adimg);
    const ads = await getDownloadURL(ref(storage, snap.ref.fullPath));

    await updateDoc(doc(db, 'admin', auth.currentUser.uid), {
      adsCover: ads,
      adsCoverPath: snap.ref.fullPath,
    });

    setAdimg('');
    setUser({ ...user, adsCover: ads }); // Update user.adsCover with the URL of the uploaded image
  } catch (err) {
    console.log(err);
  }
  setIsImageSelected(false);
  // navigate('/dashboard');
};
 const handleSelectImage = (e) => {
   setAdimg(e.target.files[0]);
   setIsImageSelected(true);
 };


  const updateField = async () => {

    setInfo({ ...info, error: null, loading: true });
    try {
      const docRef = doc(db, 'admin', auth?.currentUser?.uid);
      await updateDoc(docRef, {
        businessName: businessName,
        email: email,
        storeBio: storeBio,
        phoneNumber: phoneNumber,
        storeCurrency: storeCurrency,
        location: location,
      });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }

    setBusinessName('');
    setEmail('');
    setStoreBio('');
    setLocation('');
    setPhoneNumber('');
    setStoreCurrency('');
    navigate('/dashboard');
  };

  // Validating if the business Name Exists
  useEffect(() => {
    async function checkBusinessNameExists() {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'admin'),
          where('businessName', '==', businessName)
        )
      );
      setBusinessNameExists(!querySnapshot.empty);
    }
    if (businessName) {
      checkBusinessNameExists();
    }
  }, [businessName]);

  useEffect(() => {
    getDoc(doc(db, 'admin', auth?.currentUser?.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        setBusinessName(docSnap.data().businessName || '');
        setEmail(docSnap.data().email || '');
        setStoreBio(docSnap.data().storeBio || '');
        setPhoneNumber(docSnap.data().phoneNumber || '');
        setLocation(docSnap.data().location || '');
      }
    });
  }, []);
  // console.log(user);

  const und = user?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);

  return user ? (
    <>
      <div className="through">
        <div className="sett mb-3">
          <div>
            <div style={{ position: 'relative' }}>
              <div className="store-cover">
                {isImageSelected && (
                  <img
                    src={URL.createObjectURL(adimg)}
                    alt=""
                    className="store-cover2"
                  />
                )}
                {!isImageSelected && (
                  <img
                    src={user.adsCover || null}
                    alt=""
                    className="store-cover2"
                  />
                )}
              </div>
              <div>
                <label className="upppoi" htmlFor="upload">
                  Select Image
                </label>
                <input
                  id="upload"
                  type="file"
                  required
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleSelectImage}
                />
                {isImageSelected && (
                  <button className="upppoi" onClick={ADCover}>
                    {loading2 ? (
                      <CircularProgress
                        style={{
                          width: '25px',
                          height: '25px',
                          color: 'white',
                        }}
                      />
                    ) : (
                      'Save cover'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="loo">
            <div className="retrospect">
              <div className="ava-wrapper">
                <div className="ava">
                  {user?.businessName?.charAt(0)}.{firstLetterAfterUnderscore}
                </div>
                <div className="fhfh">
                  {(new Date() - user.createdAt?.toDate()) /
                    (1000 * 60 * 60 * 24 * 30) >=
                    1 && <GoVerified />}
                </div>
              </div>
            </div>
          </div>
          <div className="GFly">{user?.businessName}</div>
          <div className="g-stores">{formattedDuration} on e-market</div>
          <div className="container mt-5">
            <div className="eleoo">
              <div className="div">Store Details</div>
              <div className="row mt-4">
                <div className="col-12 col-lg-6 mb-4">
                  <div>
                    <div className="trouble">Business Name</div>
                    <input
                      type="text"
                      className="cupid"
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                    {businessNameExists && (
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#ff0000',

                          marginBottom: '8px',
                          marginTop: '8px',
                        }}
                      >
                        An account with <b>{businessName}</b> already exists,
                        Please choose a different Business name.(ignore if the
                        name is currently yours)
                      </p>
                    )}
                    <div className="mt-3 trouble">
                      Your Business Name will be visible to everyone on that
                      check your store
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 ">
                  <div>
                    <div className="trouble">Email</div>
                    <input
                      type="text"
                      className="cupid"
                      placeholder="@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <div className="trouble">About Store</div>
                  <textarea
                    className="lrted"
                    rows="7"
                    placeholder="Enter store description"
                    value={storeBio}
                    onChange={(e) => setStoreBio(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="trouble">Location</div>

                    <input
                      type="text"
                      className="cupid"
                      placeholder="Blaock J,Alaba market Lagos Nigeria "
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="trouble">Phone Number</div>
                    <input
                      type="text"
                      className="cupid"
                      placeholder="e.g: 08123769045"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="trouble">Store Currency</div>
                    <select
                      className="yesss"
                      value={storeCurrency}
                      onChange={(e) => setStoreCurrency(e.target.value)}
                    >
                      <option value="">choose currency</option>
                      <option value="₦">₦</option>
                      <option value="$">$</option>
                      <option value="£">£</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  {/* <div>
                  <div className="trouble">Location</div>
                  <select className="yesss">
                    <option value="">Ajeromi Ifelodun</option>
                    <option value="option1">NGN</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="container brilliant woww2">
            <div>
              <button className="delete">Deactivate Store </button>
            </div>
            <div className="">
              <button className="save" onClick={updateField}>
                {loading ? (
                  <CircularProgress
                    style={{ width: '25px', height: '25px', color: 'white' }}
                  />
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default OwnerSettings;
