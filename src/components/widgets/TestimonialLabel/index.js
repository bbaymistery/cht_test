import React from "react";
import styles from "./styles.module.scss";
import Image from 'next/image'
import googleImaeReview from '../../../../public/images/review1.png'
const TestimonialLabel = () => {
  return (
    <>
      <div className={styles.testimonial}>
        <div className={styles.container}>
          <h1 className={styles.heading_title}>
            Why choose Churchill Transfers ?
          </h1>
          <a
            target="_blank"
            href="https://goo.gl/maps/D8Ey4BY7Y67V9wQZ8"
            className={styles.img_div}>
            <Image
              src={googleImaeReview}
              alt="Heathrow Gatwick Transfers Review "
              width={270}
              height={183}
              sizes={"100vw"}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default TestimonialLabel;
