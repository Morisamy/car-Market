'use client'

import { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Typography, Space } from 'antd'
import { SearchOutlined, CarOutlined, ToolOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Search } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [cars, setCars] = useState<Model.Car[]>([])
  const [spareParts, setSpareParts] = useState<Model.SparePart[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsFound = await Api.Car.findMany({ includes: ['owner'] })
        const sparePartsFound = await Api.SparePart.findMany({
          includes: ['owner'],
        })
        setCars(carsFound)
        setSpareParts(sparePartsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }
    fetchData()
  }, [])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const filteredCars = cars.filter(
    car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSpareParts = spareParts.filter(
    part =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout layout="narrow">
      <Space
        direction="vertical"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Title>Browse and Search</Title>
        <Text>Find the perfect car to rent or the spare parts you need.</Text>
        <Search
          placeholder="Search for cars or spare parts"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ marginBottom: '20px' }}
        />
        <Row gutter={[16, 16]}>
          {filteredCars.map(car => (
            <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
              <Card
                hoverable
                onClick={() => router.push(`/cars/${car.id}`)}
                cover={
                  <CarOutlined style={{ fontSize: '48px', padding: '20px' }} />
                }
              >
                <Card.Meta
                  title={`${car.make} ${car.model}`}
                  description={`$${car.pricePerDay} per day`}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {filteredSpareParts.map(part => (
            <Col xs={24} sm={12} md={8} lg={6} key={part.id}>
              <Card
                hoverable
                onClick={() => router.push(`/spare-parts/${part.id}`)}
                cover={
                  <ToolOutlined style={{ fontSize: '48px', padding: '20px' }} />
                }
              >
                <Card.Meta title={part.name} description={`$${part.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
