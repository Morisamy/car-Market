'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Row, Col, Spin, Card } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CarDetailsPage() {
  const router = useRouter()
  const params = useParams<{ carId: string }>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [car, setCar] = useState<Model.Car | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carData = await Api.Car.findOne(params.carId, {
          includes: ['owner'],
        })
        setCar(carData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch car details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchCarDetails()
  }, [params.carId])

  const handleAddToCart = async () => {
    if (!userId) {
      enqueueSnackbar('You need to be logged in to add items to the cart', {
        variant: 'info',
      })
      return
    }
    try {
      await Api.CartItem.createOneByCarId(car?.id!, { cartId: userId })
      enqueueSnackbar('Car added to cart', { variant: 'success' })
      router.push('/cart')
    } catch (error) {
      enqueueSnackbar('Failed to add car to cart', { variant: 'error' })
    }
  }

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!car) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Car Details</Title>
        <Text>Car not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Car Details</Title>
      <Paragraph>Get more information about the car before renting.</Paragraph>
      <Row justify="center">
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            cover={
              <img
                alt={`${car.make} ${car.model}`}
                src={car.owner?.pictureUrl || '/default-car.jpg'}
              />
            }
          >
            <Title level={3}>
              {car.make} {car.model}
            </Title>
            <Text>{car.year}</Text>
            <Paragraph>Price per day: ${car.pricePerDay}</Paragraph>
            <Paragraph>Owner: {car.owner?.name}</Paragraph>
            <Paragraph>
              Date Listed: {dayjs(car.dateCreated).format('MMMM D, YYYY')}
            </Paragraph>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
