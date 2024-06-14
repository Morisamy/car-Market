'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Card, Row, Col } from 'antd'
import { CarOutlined, CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function RentalHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [rentalHistory, setRentalHistory] = useState<Model.RentalHistory[]>([])

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['rentalHistorys', 'rentalHistorys.car'],
      })
        .then(user => {
          setRentalHistory(user.rentalHistorys || [])
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch rental history', {
            variant: 'error',
          })
        })
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Rental History</Title>
      <Text>Here you can view the cars you have rented in the past.</Text>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={rentalHistory}
            renderItem={item => (
              <List.Item>
                <Card
                  title={
                    <>
                      <CarOutlined /> {item.car?.make} {item.car?.model}
                    </>
                  }
                  bordered={false}
                >
                  <p>
                    <CalendarOutlined /> Rental Date:{' '}
                    {dayjs(item.rentalDate).format('MMMM D, YYYY')}
                  </p>
                  <p>
                    <CalendarOutlined /> Return Date:{' '}
                    {dayjs(item.returnDate).format('MMMM D, YYYY')}
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
