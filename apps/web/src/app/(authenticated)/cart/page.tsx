'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, List, Row, Col, Spin } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CartPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [cart, setCart] = useState<Model.Cart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: [
          'carts',
          'carts.cartItems',
          'carts.cartItems.car',
          'carts.cartItems.sparePart',
        ],
      })
        .then(user => {
          if (user.carts && user.carts.length > 0) {
            setCart(user.carts[0])
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to load cart', { variant: 'error' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [userId])

  const handleCheckout = async () => {
    if (!cart || !userId) return

    try {
      // Assuming we need to create rental or purchase history
      const rentalPromises =
        cart.cartItems
          ?.filter(item => item.carId)
          .map(item => {
            return Api.RentalHistory.createOneByUserId(userId, {
              rentalDate: dayjs().format('YYYY-MM-DD'),
              returnDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
              carId: item.carId,
            })
          }) || []

      const purchasePromises =
        cart.cartItems
          ?.filter(item => item.sparePartId)
          .map(item => {
            return Api.PurchaseHistory.createOneByUserId(userId, {
              purchaseDate: dayjs().format('YYYY-MM-DD'),
              sparePartId: item.sparePartId,
            })
          }) || []

      await Promise.all([...rentalPromises, ...purchasePromises])

      enqueueSnackbar('Checkout successful', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Checkout failed', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Checkout</Title>
          <Paragraph>Review your cart items and proceed to checkout.</Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify="center">
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={cart?.cartItems}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<ShoppingCartOutlined />}
                    title={
                      item.car
                        ? `${item.car.make} ${item.car.model}`
                        : item.sparePart?.name
                    }
                    description={
                      item.car
                        ? `Price per day: $${item.car.pricePerDay}`
                        : `Price: $${item.sparePart?.price}`
                    }
                  />
                </List.Item>
              )}
            />
            <Button type="primary" onClick={handleCheckout} block>
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
      )}
    </PageLayout>
  )
}
