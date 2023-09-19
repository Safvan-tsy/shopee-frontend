import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes, FaGratipay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/loader/Loader';
import OverviewCards from '../../components/seller/dashboard/card/OverviewCards';
import OverviewGraph from '../../components/seller/dashboard/chart/OverviewGraph';
import CustomerFeedback from '../../components/seller/dashboard/card/CustomerFeedback';
import TopProducts from '../../components/seller/dashboard/topProducts/TopProducts';


const DashboardScreen = () => {
  return <>
    <Row>
      <Col md={9}>
        <OverviewCards />
        <OverviewGraph />
      </Col>
      <Col md={3}>
        <CustomerFeedback />
        <TopProducts />
      </Col>
    </Row>
  </>

}

export default DashboardScreen