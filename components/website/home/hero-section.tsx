
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@/css/style.css';

// import '@/assets/css/responsive.css';
import { Link } from 'lucide-react';
import DrBioSection from './drbio-section';

const EBioCares = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="ayur-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-banner-heading">
                <h1>
                  Electropathy <span>Biopathy &</span>{' '}
                  <span style={{ color: 'green' }}>Natural Remedies</span>
                </h1>
                <p>
                  Autism, <a href="/adhd">ADHD</a>, Speech Disorder, Cerebral Palsy, Cancer, Chronic Kidney Disease, Paralysis, Diabetes, Lungs Disease Specialist
                </p>
                <a href="/about" className="ayur-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ayur-banner-slider-sec">
                <Swiper
                  modules={[Navigation, Autoplay, EffectCoverflow]}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  }}
                  breakpoints={{
                    320: {
                      spaceBetween: -30,
                      coverflowEffect: {
                        depth: 60,
                        modifier: 1.5,
                      },
                    },
                    768: {
                      spaceBetween: -50,
                      coverflowEffect: {
                        depth: 80,
                        modifier: 2,
                      },
                    },
                    1024: {
                      spaceBetween: -80,
                      coverflowEffect: {
                        depth: 100,
                        modifier: 2.5,
                      },
                    },
                  }}
                  className="ayur-banner-slider"
                >
                  <SwiperSlide>
                    <div className="ayur-ban-slide">
                      <img src="/images/ban-head-Image.png" alt="headerimage" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="ayur-ban-slide">
                      <img src="/images/ban-head-Image-1.jpg" alt="headerimage" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="ayur-ban-slide">
                      <img src="/images/ban-head-Image-2.png" alt="headerimage" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="ayur-ban-slide">
                      <img src="/images/ban-head-Image-4.png" alt="headerimage" />
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button-prev">
                    <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.520424 9.74414L0.522022 9.74245L9.79254 0.51664C10.4871 -0.174498 11.6104 -0.171926 12.3017 0.522671C12.9929 1.21718 12.9903 2.34051 12.2958 3.03174L6.07152 9.22581H43.6452C44.6251 9.22581 45.4194 10.0201 45.4194 11C45.4194 11.9799 44.6251 12.7742 43.6452 12.7742H6.07161L12.2957 18.9683C12.9902 19.6595 12.9928 20.7828 12.3016 21.4773C11.6103 22.172 10.4869 22.1744 9.79245 21.4834L0.521931 12.2575L0.520336 12.2559C-0.17453 11.5623 -0.17231 10.4354 0.520424 9.74414Z"
                        fill="#F6F1ED"
                      />
                    </svg>
                  </div>
                  <div className="swiper-button-next">
                    <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M44.899 9.74414L44.8974 9.74245L35.6269 0.51664C34.9324 -0.174498 33.8091 -0.171926 33.1177 0.522671C32.4265 1.21718 32.4292 2.34051 33.1237 3.03174L39.3479 9.22581H1.77419C0.794307 9.22581 0 10.0201 0 11C0 11.9799 0.794307 12.7742 1.77419 12.7742H39.3478L33.1238 18.9683C32.4293 19.6595 32.4266 20.7828 33.1178 21.4773C33.8091 22.172 34.9326 22.1744 35.627 21.4834L44.8975 12.2575L44.8991 12.2559C45.594 11.5623 45.5917 10.4354 44.899 9.74414Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="ayur-ban-leaf">
          <img src="/images/ban-leafleft.png" alt="leaf-image" />
          <img src="/images/ban-leafright.png" alt="leaf-image" />
        </div>
      </div>
                    <DrBioSection />
      {/* Renowned Doctor Section */}
   

      {/* Electropathy/Biopathy History Section */}
      <div className="ayur-bgcover ayur-about-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="ayur-about-img">
                <img
                  src="/images/about.jpg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="ayur-heading-wrap ayur-about-head">
                <h3>Electropathy/Biopathy History</h3>
                <p style={{ textAlign: 'justify' }}>
                  Electropathy - A Natural healing system, was founded by Count Mattei and later advanced by Theodore Krauss. After its revival post - World War I, the unique spagyric method emerged in Germany, blending nature with science to create effective remedies for a variety of illnesses.
                  <br /><br />
                  This holistic approach is suitable for everyone, regardless of age or health condition. Whether you're managing chronic issues like arthritis, migraine, or ulcers, or seeking relief from emotional challenges like depression, electropathy's natural remedies are designed to support your healing journey and enhance your overall well-being.
                  <br /><br />
                  <span style={{ fontWeight: 'bold', color: 'black' }}>
                    <span style={{ color: 'brown', fontWeight: 'bold' }}>Dr. Jaswinder Singh</span> invented medicines which is the combination of Electrpathy and Ayurvedic treatments and cured thousands of patients of Brain Disorder includes Autism, ADHD, Speech Disorder and Cerebral Palsy and founded a new branch of medical science known as <span style={{ color: 'brown', fontWeight: 'bold' }}>BIOPATHY.</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ayur-bgshape ayur-about-bgshape">
          <img src="/images/bg-shape2.png" alt="img" />
          <img src="/images/bg-leaf2.png" alt="img" />
        </div>
      </div>

      {/* Achievements Section */}
      <div className="ayur-bgcover ayur-achievement-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="ayur-heading-wrap ayur-heading-left">
                <h5>E-Bio Cares</h5>
                <h3>Benefit From Choosing The Best</h3>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="ayur-achieve-box-wrapper">
                <div className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <img src="/images/achieve-icon3.png" alt="icon" />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting percent">100%</h2>
                    <p style={{ color: '#000' }}>Success Rate</p>
                  </div>
                </div>
                <div className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <img src="/images/achieve-icon2.png" alt="icon" />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting">512,128</h2>
                    <p style={{ color: '#000' }}>Patients Treated</p>
                  </div>
                </div>
                <div className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <img src="/images/achieve-icon4.png" alt="icon" />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting percent">100%</h2>
                    <p style={{ color: '#000' }}>Product Purity</p>
                  </div>
                </div>
                <div className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <img src="/images/achieve-icon1.png" alt="icon" />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting percent">0%</h2>
                    <p style={{ color: '#000' }}>Side Effects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section with Video */}
      <div className="ayur-bgcover ayur-why-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-heading-wrap ayur-why-head">
                <h5>Best For You</h5>
                <h3>Why Choose Electropathy/Biopathy ?</h3>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="ayur-why-secbox">
                <div className="ayur-why-box">
                  <div className="ayur-why-boxicon">
                    <img src="/images/why-icon1.png" alt="icon" />
                  </div>
                  <div className="ayur-why-boxtext">
                    <h4>100 % Organic</h4>
                    <p>Pure, Natural, and Free from chemicals-just as nature intended!</p>
                  </div>
                </div>
                <div className="ayur-why-box">
                  <div className="ayur-why-boxicon">
                    <img src="/images/why-icon2.png" alt="icon" />
                  </div>
                  <div className="ayur-why-boxtext">
                    <h4>Best Quality</h4>
                    <p>Uncompromising excellence in every product!</p>
                  </div>
                </div>
                <div className="ayur-why-box">
                  <div className="ayur-why-boxicon">
                    <img src="/images/why-icon3.png" alt="icon" />
                  </div>
                  <div className="ayur-why-boxtext">
                    <h4>Hygienic Product</h4>
                    <p>Ensuring Purity and Cleanliness in every use!</p>
                  </div>
                </div>
                <div className="ayur-why-box">
                  <div className="ayur-why-boxicon">
                    <img src="/images/why-icon4.png" alt="icon" />
                  </div>
                  <div className="ayur-why-boxtext">
                    <h4>Health Care</h4>
                    <p>Caring for your Health with pure excellence!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="ayur-why-textheading">
                <h3>Solve health issues with Nature's Blessings.</h3>
                <p style={{ textAlign: 'justify' }}>
                  At E-Bio-Cares, we believe in using the power of plants to help your body heal itself. Our approach is simple - we want to balance your body, getting rid of any issues by making sure your blood and lymphatic systems work together smoothly.
                </p>
                <p style={{ color: '#000' }}>
                  We don't just treat symptoms; we tackle the root cause to ensure a complete and lasting recovery.
                </p>
                <ul>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Targeted Healing: Yes.</p>
                  </li>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Invasive: No.</p>
                  </li>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Gentle and Natural: Yes.</p>
                  </li>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Side Effects: No.</p>
                  </li>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Suitable for Age Group: All.</p>
                  </li>
                  <li>
                    <img src="/images/tick.png" alt="icon" />
                    <p style={{ color: '#000' }}>Painful: No.</p>
                  </li>
                </ul>
                <div className="ayur-why-btn">
                  <a href="/treatments" className="ayur-btn">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-video-section">
                <div className="ayur-video-container">
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/V-kD6A2nY48?autoplay=0&rel=0&modestbranding=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ayur-bgshape ayur-why-bgshape">
          <img src="/images/bg-shape4.png" alt="img" />
          <img src="/images/bg-leaf4.png" alt="img" />
        </div>
      </div>
    </div>
  );
};

export default EBioCares;
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import '@/css/style.css';

// // import '@/assets/css/responsive.css';
// import { Link } from 'lucide-react';
// import DrBioSection from './drbio-section';

// const EBioCares = () => {
//   return (
//     <div>
//       {/* Banner Section */}
//       <div className="ayur-banner-section">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 col-md-12 col-sm-12">
//               <div className="ayur-banner-heading">
//                 <h1>
//                   Electropathy <span>Biopathy &</span>{' '}
//                   <span style={{ color: 'green' }}>Natural Remedies</span>
//                 </h1>
//                 <p>
//                   Autism, <a href="/adhd">ADHD</a>, Speech Disorder, Cerebral Palsy, Cancer, Chronic Kidney Disease, Paralysis, Diabetes, Lungs Disease Specialist
//                 </p>
//                 <a href="/about" className="ayur-btn">
//                   Read More
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="ayur-banner-slider-sec">
//                 <Swiper
//                   modules={[Navigation, Autoplay]}
//                   navigation={{
//                     prevEl: '.swiper-button-prev',
//                     nextEl: '.swiper-button-next',
//                   }}
//                   autoplay={{
//                     delay: 3000,
//                     disableOnInteraction: false,
//                   }}
//                   loop={true}
//                   className="ayur-banner-slider"
//                 >
//                   <SwiperSlide>
//                     <div className="ayur-ban-slide">
//                       <img src="/images/ban-head-Image.png" alt="headerimage" />
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <div className="ayur-ban-slide">
//                       <img src="/images/ban-head-Image-1.jpg" alt="headerimage" />
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <div className="ayur-ban-slide">
//                       <img src="/images/ban-head-Image-2.png" alt="headerimage" />
//                     </div>
//                   </SwiperSlide>
//                   <SwiperSlide>
//                     <div className="ayur-ban-slide">
//                       <img src="/images/ban-head-Image-4.png" alt="headerimage" />
//                     </div>
//                   </SwiperSlide>
//                   <div className="swiper-button-prev">
//                     <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M0.520424 9.74414L0.522022 9.74245L9.79254 0.51664C10.4871 -0.174498 11.6104 -0.171926 12.3017 0.522671C12.9929 1.21718 12.9903 2.34051 12.2958 3.03174L6.07152 9.22581H43.6452C44.6251 9.22581 45.4194 10.0201 45.4194 11C45.4194 11.9799 44.6251 12.7742 43.6452 12.7742H6.07161L12.2957 18.9683C12.9902 19.6595 12.9928 20.7828 12.3016 21.4773C11.6103 22.172 10.4869 22.1744 9.79245 21.4834L0.521931 12.2575L0.520336 12.2559C-0.17453 11.5623 -0.17231 10.4354 0.520424 9.74414Z"
//                         fill="#F6F1ED"
//                       />
//                     </svg>
//                   </div>
//                   <div className="swiper-button-next">
//                     <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M44.899 9.74414L44.8974 9.74245L35.6269 0.51664C34.9324 -0.174498 33.8091 -0.171926 33.1177 0.522671C32.4265 1.21718 32.4292 2.34051 33.1237 3.03174L39.3479 9.22581H1.77419C0.794307 9.22581 0 10.0201 0 11C0 11.9799 0.794307 12.7742 1.77419 12.7742H39.3478L33.1238 18.9683C32.4293 19.6595 32.4266 20.7828 33.1178 21.4773C33.8091 22.172 34.9326 22.1744 35.627 21.4834L44.8975 12.2575L44.8991 12.2559C45.594 11.5623 45.5917 10.4354 44.899 9.74414Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </div>
//                 </Swiper>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ayur-ban-leaf">
//           <img src="/images/ban-leafleft.png" alt="leaf-image" />
//           <img src="/images/ban-leafright.png" alt="leaf-image" />
//         </div>
//       </div>
//                     <DrBioSection />
//       {/* Renowned Doctor Section */}
   

//       {/* Electropathy/Biopathy History Section */}
//       <div className="ayur-bgcover ayur-about-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="ayur-about-img">
//                 <img
//                   src="/images/about.jpg"
//                   alt="img"
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="ayur-heading-wrap ayur-about-head">
//                 <h3>Electropathy/Biopathy History</h3>
//                 <p style={{ textAlign: 'justify' }}>
//                   Electropathy - A Natural healing system, was founded by Count Mattei and later advanced by Theodore Krauss. After its revival post - World War I, the unique spagyric method emerged in Germany, blending nature with science to create effective remedies for a variety of illnesses.
//                   <br /><br />
//                   This holistic approach is suitable for everyone, regardless of age or health condition. Whether you're managing chronic issues like arthritis, migraine, or ulcers, or seeking relief from emotional challenges like depression, electropathy's natural remedies are designed to support your healing journey and enhance your overall well-being.
//                   <br /><br />
//                   <span style={{ fontWeight: 'bold', color: 'black' }}>
//                     <span style={{ color: 'brown', fontWeight: 'bold' }}>Dr. Jaswinder Singh</span> invented medicines which is the combination of Electrpathy and Ayurvedic treatments and cured thousands of patients of Brain Disorder includes Autism, ADHD, Speech Disorder and Cerebral Palsy and founded a new branch of medical science known as <span style={{ color: 'brown', fontWeight: 'bold' }}>BIOPATHY.</span>
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ayur-bgshape ayur-about-bgshape">
//           <img src="/images/bg-shape2.png" alt="img" />
//           <img src="/images/bg-leaf2.png" alt="img" />
//         </div>
//       </div>

//       {/* Achievements Section */}
//       <div className="ayur-bgcover ayur-achievement-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-4 col-md-12 col-sm-12">
//               <div className="ayur-heading-wrap ayur-heading-left">
//                 <h5>E-Bio Cares</h5>
//                 <h3>Benefit From Choosing The Best</h3>
//               </div>
//             </div>
//             <div className="col-lg-8 col-md-12 col-sm-12">
//               <div className="ayur-achieve-box-wrapper">
//                 <div className="ayur-achieve-box">
//                   <div className="ayur-achieve-icon">
//                     <img src="/images/achieve-icon3.png" alt="icon" />
//                   </div>
//                   <div className="ayur-achieve-text">
//                     <h2 className="ayur-counting percent">100%</h2>
//                     <p style={{ color: '#000' }}>Success Rate</p>
//                   </div>
//                 </div>
//                 <div className="ayur-achieve-box">
//                   <div className="ayur-achieve-icon">
//                     <img src="/images/achieve-icon2.png" alt="icon" />
//                   </div>
//                   <div className="ayur-achieve-text">
//                     <h2 className="ayur-counting">512,128</h2>
//                     <p style={{ color: '#000' }}>Patients Treated</p>
//                   </div>
//                 </div>
//                 <div className="ayur-achieve-box">
//                   <div className="ayur-achieve-icon">
//                     <img src="/images/achieve-icon4.png" alt="icon" />
//                   </div>
//                   <div className="ayur-achieve-text">
//                     <h2 className="ayur-counting percent">100%</h2>
//                     <p style={{ color: '#000' }}>Product Purity</p>
//                   </div>
//                 </div>
//                 <div className="ayur-achieve-box">
//                   <div className="ayur-achieve-icon">
//                     <img src="/images/achieve-icon1.png" alt="icon" />
//                   </div>
//                   <div className="ayur-achieve-text">
//                     <h2 className="ayur-counting percent">0%</h2>
//                     <p style={{ color: '#000' }}>Side Effects</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Section with Video */}
//       <div className="ayur-bgcover ayur-why-sec" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 col-md-12 col-sm-12">
//               <div className="ayur-heading-wrap ayur-why-head">
//                 <h5>Best For You</h5>
//                 <h3>Why Choose Electropathy/Biopathy ?</h3>
//               </div>
//             </div>
//           </div>
//           <div className="row align-items-center">
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="ayur-why-secbox">
//                 <div className="ayur-why-box">
//                   <div className="ayur-why-boxicon">
//                     <img src="/images/why-icon1.png" alt="icon" />
//                   </div>
//                   <div className="ayur-why-boxtext">
//                     <h4>100 % Organic</h4>
//                     <p>Pure, Natural, and Free from chemicals-just as nature intended!</p>
//                   </div>
//                 </div>
//                 <div className="ayur-why-box">
//                   <div className="ayur-why-boxicon">
//                     <img src="/images/why-icon2.png" alt="icon" />
//                   </div>
//                   <div className="ayur-why-boxtext">
//                     <h4>Best Quality</h4>
//                     <p>Uncompromising excellence in every product!</p>
//                   </div>
//                 </div>
//                 <div className="ayur-why-box">
//                   <div className="ayur-why-boxicon">
//                     <img src="/images/why-icon3.png" alt="icon" />
//                   </div>
//                   <div className="ayur-why-boxtext">
//                     <h4>Hygienic Product</h4>
//                     <p>Ensuring Purity and Cleanliness in every use!</p>
//                   </div>
//                 </div>
//                 <div className="ayur-why-box">
//                   <div className="ayur-why-boxicon">
//                     <img src="/images/why-icon4.png" alt="icon" />
//                   </div>
//                   <div className="ayur-why-boxtext">
//                     <h4>Health Care</h4>
//                     <p>Caring for your Health with pure excellence!</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-12 col-sm-12">
//               <div className="ayur-why-textheading">
//                 <h3>Solve health issues with Nature's Blessings.</h3>
//                 <p style={{ textAlign: 'justify' }}>
//                   At E-Bio-Cares, we believe in using the power of plants to help your body heal itself. Our approach is simple - we want to balance your body, getting rid of any issues by making sure your blood and lymphatic systems work together smoothly.
//                 </p>
//                 <p style={{ color: '#000' }}>
//                   We don't just treat symptoms; we tackle the root cause to ensure a complete and lasting recovery.
//                 </p>
//                 <ul>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Targeted Healing: Yes.</p>
//                   </li>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Invasive: No.</p>
//                   </li>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Gentle and Natural: Yes.</p>
//                   </li>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Side Effects: No.</p>
//                   </li>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Suitable for Age Group: All.</p>
//                   </li>
//                   <li>
//                     <img src="/images/tick.png" alt="icon" />
//                     <p style={{ color: '#000' }}>Painful: No.</p>
//                   </li>
//                 </ul>
//                 <div className="ayur-why-btn">
//                   <a href="/treatments" className="ayur-btn">
//                     Read More
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-12 col-md-12 col-sm-12">
//               <div className="ayur-video-section">
//                 <div className="ayur-video-container">
//                   <iframe
//                     width="100%"
//                     height="500"
//                     src="https://www.youtube.com/embed/V-kD6A2nY48?autoplay=0&rel=0&modestbranding=1"
//                     title="YouTube video player"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     referrerPolicy="strict-origin-when-cross-origin"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ayur-bgshape ayur-why-bgshape">
//           <img src="/images/bg-shape4.png" alt="img" />
//           <img src="/images/bg-leaf4.png" alt="img" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EBioCares;