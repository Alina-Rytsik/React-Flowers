import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard = (props) => (
  <ContentLoader
    speed={2}
    width={210}
    height={280}
    viewBox='0 0 210 280'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='0' y='2' rx='0' ry='0' width='160' height='180' />
    <rect x='0' y='196' rx='0' ry='0' width='200' height='30' />
    <rect x='0' y='234' rx='0' ry='0' width='72' height='16' />
    <rect x='0' y='256' rx='0' ry='0' width='72' height='18' />
    <rect x='174' y='236' rx='10' ry='10' width='30' height='30' />
  </ContentLoader>
);

export default SkeletonCard;
