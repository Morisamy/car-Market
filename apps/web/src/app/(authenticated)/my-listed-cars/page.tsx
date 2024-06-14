'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageListedCarsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [listedCars, setListedCars] = useState<Model.ListedCar[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCar, setEditingCar] = useState<Model.ListedCar | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['listedCars', 'listedCars.car'] })
        .then(user => setListedCars(user.listedCars || []))
        .catch(error =>
          enqueueSnackbar('Failed to fetch listed cars', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleAddCar = () => {
    setEditingCar(null)
    setIsModalVisible(true)
  }

  const handleEditCar = (car: Model.ListedCar) => {
    setEditingCar(car)
    setIsModalVisible(true)
    form.setFieldsValue(car.car)
  }

  const handleDeleteCar = async (carId: string) => {
    try {
      await Api.ListedCar.deleteOne(carId)
      setListedCars(listedCars.filter(car => car.id !== carId))
      enqueueSnackbar('Car deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete car', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingCar) {
        const updatedCar = await Api.ListedCar.updateOne(editingCar.id, {
          car: values,
        })
        setListedCars(
          listedCars.map(car => (car.id === editingCar.id ? updatedCar : car)),
        )
        enqueueSnackbar('Car updated successfully', { variant: 'success' })
      } else {
        const newCar = await Api.ListedCar.createOneByUserId(userId, {
          car: values,
        })
        setListedCars([...listedCars, newCar])
        enqueueSnackbar('Car added successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to save car', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Make',
      dataIndex: ['car', 'make'],
      key: 'make',
    },
    {
      title: 'Model',
      dataIndex: ['car', 'model'],
      key: 'model',
    },
    {
      title: 'Year',
      dataIndex: ['car', 'year'],
      key: 'year',
    },
    {
      title: 'Price Per Day',
      dataIndex: ['car', 'pricePerDay'],
      key: 'pricePerDay',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditCar(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCar(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Listed Cars</Title>
      <Text>List and manage your cars for rent.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddCar}
        style={{ marginBottom: 16 }}
      >
        Add Car
      </Button>
      <Table columns={columns} dataSource={listedCars} rowKey="id" />

      <Modal
        title={editingCar ? 'Edit Car' : 'Add Car'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="make"
            label="Make"
            rules={[
              { required: true, message: 'Please input the make of the car!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[
              { required: true, message: 'Please input the model of the car!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[
              { required: true, message: 'Please input the year of the car!' },
            ]}
          >
            <InputNumber
              min={1886}
              max={new Date().getFullYear()}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="pricePerDay"
            label="Price Per Day"
            rules={[
              { required: true, message: 'Please input the price per day!' },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
