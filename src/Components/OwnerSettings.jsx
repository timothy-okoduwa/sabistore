import React, { useState, useEffect } from 'react';
import '../pages/Settings/Settings.css';
import { GoVerified } from 'react-icons/go';
import { db, auth, storage } from '../firebase';
import { RiErrorWarningFill } from 'react-icons/ri';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MdCancel } from 'react-icons/md';
import 'hover.css/css/hover-min.css';
import p from './images/party-popper_1f389.png';
import moment from 'moment';
import { BsFillCheckCircleFill } from 'react-icons/bs';
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
  listAll,
} from 'firebase/storage';
import { deleteUser } from 'firebase/auth';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{ color: 'white', fontSize: '12px' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
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
  const [progress, setProgress] = React.useState(10);
  const [feedback, setFeedback] = useState('');
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    loading: false,
  });
  const [info2, setInfo2] = useState({
    loading2: false,
  });
  const { loading } = info;
  const { loading2 } = info2;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #0000000',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setConfirmationInputValue('');
  };

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
    setInfo2({ ...info, error: null, loading2: true });
    const imgRef = ref(
      storage,
      `adsimages/${new Date().getTime()} - ${adimg.name}`
    );
    try {
      // Check if user already has an adsCoverPath
      if (user.adsCoverPath) {
        // Delete the old image from Firebase Storage
        await deleteObject(ref(storage, user.adsCoverPath));
      }
      const snap = await uploadBytes(imgRef, adimg);
      const ads = await getDownloadURL(ref(storage, snap.ref.fullPath));

      await updateDoc(doc(db, 'admin', auth.currentUser.uid), {
        adsCover: ads,
        adsCoverPath: snap.ref.fullPath,
      });
      setFeedback(
        <>
          Cover image is changed successfully{' '}
          <img
            src={p}
            alt="New cover image"
            style={{ width: '7%', marginTop: '-4px' }}
          />
        </>
      );
      setTimeout(() => {
        setFeedback('');
      }, 6000);
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
      const updates = {
        businessName: businessName,
        email: email,
        storeBio: storeBio,
        phoneNumber: phoneNumber,
        location: location,
      };
      if (storeCurrency !== '') {
        updates.storeCurrency = storeCurrency;
      }
      await updateDoc(docRef, updates);
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
      setBusinessNameExists(!querySnapshot?.empty);
    }
    if (businessName) {
      checkBusinessNameExists();
    }
  }, [businessName]);

  useEffect(() => {
    getDoc(doc(db, 'admin', auth?.currentUser?.uid)).then((docSnap) => {
      if (docSnap?.exists) {
        setUser(docSnap?.data());
        setBusinessName(docSnap?.data()?.businessName || '');
        setEmail(docSnap?.data()?.email || '');
        setStoreBio(docSnap?.data()?.storeBio || '');
        setPhoneNumber(docSnap?.data()?.phoneNumber || '');
        setLocation(docSnap?.data()?.location || '');
      }
    });
  }, []);
  // console.log(user);

  const und = user?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);

  const deleteStore = async (uid) => {
    try {
      // Get user document from admin collection
      const docRef = doc(db, 'admin', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Delete all user's products
        const products = userData.products || [];
        for (const product of products) {
          const productId = product.productId;

          // Delete image folder with same name as user's productId
          const storageRef = ref(storage, `images/productImages/${productId}`);
          const listResult = await listAll(storageRef);
          listResult.items.forEach(async (itemRef) => {
            await deleteObject(itemRef);
          });
        }

        // Delete user document from admin collection
        await deleteDoc(docRef);
        console.log('Document successfully deleted!');

        // Delete user from authentication
        const user = auth.currentUser;
        if (user && user.uid === uid) {
          await deleteUser(user.uid);
          console.log('User successfully deleted!');
        }
      }
    } catch (error) {
      console.error('Error deleting document, user, or image folder: ', error);
    }
  };

  const handleDeleteClick = () => {
    const user = auth.currentUser;
    if (user) {
      deleteStore(user.uid);
      navigate('/');
    }
  };

  const [confirmationInputValue, setConfirmationInputValue] = useState('');

  const isConfirmationValid = confirmationInputValue === user?.businessName;

  const handleCancelClick = () => {
    setBusinessNameExists(false);
  };
  const handleCancelClick2 = () => {
    setFeedback('');
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    if (selectedCurrency !== '') {
      setStoreCurrency(selectedCurrency);
    }
  };

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
                  <img src={user?.adsCover} alt="" className="store-cover2" />
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
                  <button
                    className="upppoi"
                    onClick={ADCover}
                    style={{ background: '#0052CC' }}
                  >
                    {loading2 ? (
                      <CircularProgressWithLabel
                        value={progress}
                        style={{
                          width: '29px',
                          height: '29px',
                          color: 'white',
                          fontSize: '12px',
                        }}
                      />
                    ) : (
                      'Save cover'
                    )}
                  </button>
                )}
              </div>
            </div>
            {feedback && (
              <div className="alert33">
                <div>
                  <BsFillCheckCircleFill className="mx-2 loik" />
                  {feedback}
                </div>
                <div className="cann">
                  <MdCancel onClick={handleCancelClick2} />
                </div>
              </div>
            )}
          </div>
          <div className="loo">
            <div className="retrospect">
              <div className="ava-wrapper">
                <div className="ava">
                  {user?.businessName?.charAt(0)}.{firstLetterAfterUnderscore}
                </div>
                <div className="fhfh2">
                  {(user.businessName === 'Tech_Hub' ||
                    (user.createdAt &&
                      (new Date() - user.createdAt.toDate()) /
                        (1000 * 60 * 60 * 24 * 30) >=
                        1)) && <GoVerified />}
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
                      <div className="alert2">
                        <div>
                          <RiErrorWarningFill className="mx-2 loik2" />
                          An account with <b>{businessName}</b> already exists,
                          Please choose a different Business name.(ignore if the
                          name is currently yours)
                        </div>
                        <div className="cann">
                          <MdCancel onClick={handleCancelClick} />
                        </div>
                      </div>
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
                      onChange={handleCurrencyChange}
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
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <div className="d-flex justify-content-end">
                    <MdCancel
                      style={{
                        fontSize: '25px',
                        cursor: 'pointer',
                        marginTop: '-15px',
                      }}
                      onClick={handleClose}
                    />
                  </div>
                  <div className="Confirm">Confirm your action.</div>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <div className="this">
                      Once you deactivate your store all your product and
                      services will be{' '}
                      <strong className="per"> permenantly Deleted</strong>.
                      This action cannot be undone!!
                    </div>
                    <div className="mt-4">
                      <div className="trouble">
                        Type in
                        <strong className="per">
                          {' '}
                          {user.businessName}{' '}
                        </strong>{' '}
                        for confirmation{' '}
                      </div>

                      <input
                        type="text"
                        className="cupid33 mt-2"
                        placeholder="business name"
                        value={confirmationInputValue}
                        onChange={(e) =>
                          setConfirmationInputValue(e.target.value)
                        }
                      />
                    </div>

                    <div className="mt-4 d-flex justify-content-end">
                      <button
                        className="delete hvr-wobble-top"
                        onClick={handleDeleteClick}
                        style={{
                          opacity: isConfirmationValid ? 1 : 0,
                          pointerEvents: isConfirmationValid ? 'auto' : 'none',
                        }}
                      >
                        Deactivate{' '}
                      </button>
                    </div>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
        <div className="mb-5">
          <div className="container brilliant woww2">
            <div>
              <button className="delete hvr-wobble-top" onClick={handleOpen}>
                Deactivate Store{' '}
              </button>
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
