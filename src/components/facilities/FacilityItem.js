import React from 'react';
import PropTypes from 'prop-types';
import Star from './StarIcon';
import LikeIcon from './LikeIcon';
import building from '../../assets/facility-placeholder.jpg';
import translate from '../languages/Translate';

const FacilityItem = ({
  facility, setValue, show, role,
}) => {
  const openPopup = () => {
    setValue(facility);
  };
  return (
    <>
      <div className="facility-card">
        <div className="average-rating">
          <Star fill="#ffc107" />
          <Star fill="#ffc107" />
          <Star fill="#ffc107" />
          <Star fill="#ffc107" />
          <Star fill="#ffc107" />
        </div>
        <div className="facility-image">
          <img src={facility.image || building} alt="profile" className="facility-iamge" />
        </div>
        <div className="facility-info">
          <span className="facility-name">{facility.facilityName}</span>
          <span className="facility-location">{facility.location}</span>
        </div>
        <div className="rating-likes">
          <div className="likes">
            <button type="button">
              <LikeIcon fill="#065471" class="like-icon" type="like" />
            </button>
            <button type="button">
              <LikeIcon fill="#065471" class="like-icon" type="dislike" />
            </button>
          </div>
          <div className="ratings">
            <button type="button">{translate('Add rating')}</button>
          </div>
        </div>
        <button type="button" style={{ display: (role === 'requester') ? 'block' : 'none' }} disabled={show} onClick={openPopup} className="book-facility">{translate('Book')}</button>
      </div>
    </>
  );
};

FacilityItem.propTypes = {
  facility: PropTypes.object,
  setValue: PropTypes.func,
  show: PropTypes.bool,
  role: PropTypes.string,
};

export default FacilityItem;
