'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Row, Col, Spin } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SparePartDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [sparePart, setSparePart] = useState<Model.SparePart | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSparePart = async () => {
      try {
        const sparePartId = Array.isArray(params.sparePartId)
          ? params.sparePartId[0]
          : params.sparePartId
        const sparePartFound = await Api.SparePart.findOne(sparePartId, {
          includes: ['owner'],
        })
        setSparePart(sparePartFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch spare part details', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSparePart()
  }, [params.sparePartId])

  const handleAddToCart = async () => {
    if (!userId) {
      enqueueSnackbar('You need to be logged in to add items to the cart', {
        variant: 'error',
      })
      return
    }

    try {
      const cartItems = await Api.Cart.findManyByUserId(userId, {
        includes: ['cartItems'],
      })
      const cartId = cartItems[0]?.id

      if (!cartId) {
        enqueueSnackbar('No cart found for the user', { variant: 'error' })
        return
      }

      await Api.CartItem.createOneBySparePartId(sparePart!.id, { cartId })
      enqueueSnackbar('Spare part added to cart', { variant: 'success' })
      router.push('/cart')
    } catch (error) {
      enqueueSnackbar('Failed to add spare part to cart', { variant: 'error' })
    }
  }

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Spin size="large" />
        </Row>
      </PageLayout>
    )
  }

  if (!sparePart) {
    return (
      <PageLayout layout="narrow">
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Text>Spare part not found</Text>
        </Row>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" align="middle" style={{ padding: '20px' }}>
        <Col span={24}>
          <Title level={2}>{sparePart.name}</Title>
          <Paragraph>{sparePart.description}</Paragraph>
          <Text strong>Price: ${sparePart.price}</Text>
          <br />
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            style={{ marginTop: '20px' }}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
