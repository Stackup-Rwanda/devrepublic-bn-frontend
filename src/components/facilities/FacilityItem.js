import React from 'react';
import PropTypes from 'prop-types';
import Star from './StarIcon';
import LikeIcon from './LikeIcon';
import building from '../../assets/facility-placeholder.jpg';
import translate from '../languages/Translate';

const FacilityItem = ({
  facility, setValue, show, role, userId, likeUnlikeFacility,
}) => {
  const openPopup = () => {
    setValue(facility);
  };
  const like = () => {
    const user = facility.likesId.find((el) => el === userId);
    return user;
  };
  const unLiked = () => {
    const user = facility.unlikesId.find((el) => el === userId);
    return user;
  };
  const totalLikes = () => {
    const result = facility.likes - facility.unlikes;
    if (result >= 1000) {
      return `${(result / 1000).toFixed(2)}k`;
    }
    return result;
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
            <div>
              <button className="like-button" type="button" onClick={() => likeUnlikeFacility(facility.id, 'like')} style={like() ? null : { stroke: '#065471', strokeWidth: '1px' }}>
                <LikeIcon fill={like() ? '#065471' : '#ffffff'} class="like-icon" type="like" />
              </button>
              <button type="button" style={unLiked() ? null : { stroke: '#065471', strokeWidth: '1px' }} onClick={() => likeUnlikeFacility(facility.id, 'unlike')}>
                <LikeIcon fill={unLiked() ? '#065471' : '#ffffff'} class="like-icon" type="dislike" />
              </button>
            </div>
            <div className="total-likes">{totalLikes()}</div>
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
  userId: PropTypes.string,
  likeUnlikeFacility: PropTypes.func,
};

export default FacilityItem;
