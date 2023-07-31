import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import {
    Grid,
} from '@mui/material';

import { useParams} from "react-router-dom";
import './PondSummary.scss';
import PondListCard from '../../../../../components/Organisms/PondListCard/PondListCard';
import PondSummaryCard from '../../../../../components/Organisms/PondSummaryCard/PondSummaryCard';
import PondSummaryInfoCard from '../../../../../components/Organisms/PondSummaryInfoCard/PondSummaryInfoCard';
import { get } from '../../../../../services/api'
import EditSummaryInfoCard from './EditPondSummary';
import EditWaterQuality from './EditWaterQuality'

interface PondSummaryProps {
  pondList: [];
}
const PondSummary: FC<PropsWithChildren<PondSummaryProps>> = ({ pondList }) => {
    const params = useParams();
    const [pond, setPond] = useState<any>();
    const [waterQualityStatus, setWaterQualityStatus] = useState<any>();
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openWaterQuality, setOpenWaterQuality] = useState<boolean>(false);

  useEffect(() => {
    get(`water-quality/pond/${params.id}/latest`).then((res: any) => {
      if (res) {
        setWaterQualityStatus(res.detailed_status && res.detailed_status.qualities)
      }
    });
  },[]);

  useEffect(() => {
        const pondIndex = pondList &&  pondList.findIndex((pond: any) => pond.id.toString() === params.id);
        if (pondIndex >= 0) {
            setPond(pondList[pondIndex]);
        }
    }, [params?.id]);

  const openEditPondInfoModal = () =>{
    setOpenInfo(true)
  }
  const closeEditPondInfoModal = () =>{
     setOpenInfo(false);
      get('ponds').then((res: any) => {
        if (res) {
          const pondIndex = res.ponds &&  res.ponds.findIndex((pond: any) => pond.id.toString() === params.id);
          if (pondIndex >= 0) {
            setPond(res.ponds[pondIndex]);
          }
        }
      });
  }
  const openEditWaterQualityModal = () =>{
    setOpenWaterQuality(true)
  }
  const closeEditWaterQualityModal = () => {
    setOpenWaterQuality(false);
    get('ponds').then((res: any) => {
      if (res) {
        const pondIndex = res.ponds &&  res.ponds.findIndex((pond: any) => pond.id.toString() === params.id);
        if (pondIndex >= 0) {
          setPond(res.ponds[pondIndex]);
        }
      }
    });
  }

    return (
      <Grid container columns={24} spacing={3} className='pond-summary-container'>
        <Grid item xs={24}  lg={10}>
          {pond && <PondSummaryCard
            pond={pond}
            handleEditPondInfo={openEditPondInfoModal}
            />
          }
        </Grid>
        <Grid item xs={24} lg={14}>
          <PondListCard isEditable={false}
                        title={'Water Quality'}
                        dateTime={pond?.lastWaterQuality?.published_at} temperature={pond?.lastWaterQuality?.temperature}
                        status={pond?.lastWaterQuality?.status}
                        ph={pond?.lastWaterQuality?.ph}
                        oxygen={pond?.lastWaterQuality?.oxygen}
                        waterStatus={waterQualityStatus}
                        handleEditWaterQuality={openEditWaterQualityModal}
          />
        </Grid>
        <PondSummaryInfoCard summary={pond?.summary}  />

        {openInfo &&
          <EditSummaryInfoCard pond={pond} open={openInfo} closeEditPondInfoModal={closeEditPondInfoModal}/>
        }
        {openWaterQuality &&
          <EditWaterQuality pond={pond.lastWaterQuality} open={openWaterQuality} closeEditWaterQualityModal={closeEditWaterQualityModal}/>
        }
      </Grid>
    )
}
export default PondSummary;
