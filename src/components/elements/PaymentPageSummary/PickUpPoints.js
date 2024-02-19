import React from "react";
import pointsStyle from "./pointsStyle.module.scss";
const PickUpPoints = ({ selectedPickupPoints }) => {
  return (
    <div className={pointsStyle.details}>
      {selectedPickupPoints?.map((point, i) => {
        return (
          <div className={pointsStyle.details_bottom_container} key={i}>
            <p className={pointsStyle.point_adress}>{i + 1}. {point.address}</p>
            {/*  //! for flight  */}
            {point?.flightDetails?.flightNumber && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Fligth Number:</span>
                  <span>{point?.flightDetails?.flightNumber}</span>
                </div>
              </div>
            )}
            {point?.flightDetails?.waitingPickupTime >= 0 && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Waiting Pickup Time:</span>
                  <span>{point?.flightDetails?.waitingPickupTime}</span>
                </div>
              </div>
            )}
            {/* // ! for postcodes */}
            {point?.postCodeDetails?.postCodeAddress && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Postcode Address:</span>{" "}
                  <span>{point?.postCodeDetails?.postCodeAddress}</span>
                </div>
              </div>
            )}

            {/* //!for cruise  */}
            {point?.cruiseNumber && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cruise Name:</span> <span>{point?.cruiseNumber}</span>
                </div>
              </div>
            )}

            {/* //!for train */}
            {point?.trainNumber && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Train Number:</span> <span>{point?.trainNumber}</span>
                </div>
              </div>
            )}
            {/* //!for hotel  */}
            {point?.roomNumber && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Room Number:</span> <span>{point?.roomNumber}</span>
                </div>
              </div>
            )}

            {/* //! cities*/}

            {point?.pcatId === 8 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Cities:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* UNIVERSITIES */}
            {point?.pcatId === 9 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Universities And Colleges:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}

            {/* OTHERRRRRRR */}
            {point?.pcatId === 10 && point?.["address-description"] && (
              <div className={pointsStyle.details_bottom_description}>
                <i className="fa-solid fa-circle-dot"></i>
                <div className={pointsStyle.bottom_main_desc}>
                  <span>Description:</span>{" "}
                  <span>{point?.["address-description"]}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PickUpPoints;
