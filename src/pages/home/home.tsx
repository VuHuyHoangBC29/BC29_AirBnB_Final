import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../modules/carousel/carousel";
import NearbyPlace from "../../modules/nearby-place/nearby-place";
import StayEverywhere from "../../modules/stay-everywhere/stay-everywhere";
import { fetchTicketListByUserApi } from "../../services/ticket";
import { fetchTicketsListByUserAction } from "../../store/reducers/ticketsListReducer";
import { AppDispatch, RootState } from "../../store/store";

export default function Home(): JSX.Element {
  return (
    <div>
      <Carousel />
      <NearbyPlace />
      <StayEverywhere />
    </div>
  );
}
