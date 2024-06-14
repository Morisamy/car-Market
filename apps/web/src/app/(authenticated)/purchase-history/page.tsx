'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Card, Row, Col } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PurchaseHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [purchaseHistory, setPurchaseHistory] = useState<
    Model.PurchaseHistory[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['purchaseHistorys', 'purchaseHistorys.sparePart'],
      })
        .then(user => {
          setPurchaseHistory(user.purchaseHistorys || [])
          setLoading(false)
        })
        .catch(error => {
          enqueueSnackbar('Failed to load purchase history', {
            variant: 'error',
          })
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>
            <ShoppingOutlined /> Purchase History
          </Title>
          <Text>Here you can view all the spare parts you have purchased.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          <List
            loading={loading}
            dataSource={purchaseHistory}
            renderItem={item => (
              <List.Item>
                <Card title={item.sparePart?.name} bordered={false}>
                  <p>
                    <strong>Purchase Date:</strong>{' '}
                    {dayjs(item.purchaseDate).format('MMMM D, YYYY')}
                  </p>
                  <p>
                    <strong>Description:</strong> {item.sparePart?.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.sparePart?.price}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PageLayout>
  )
}
