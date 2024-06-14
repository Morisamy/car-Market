'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  List,
  Card,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageListedSparePartsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [spareParts, setSpareParts] = useState<Model.SparePart[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingSparePart, setEditingSparePart] =
    useState<Model.SparePart | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['listedSpareParts', 'listedSpareParts.sparePart'],
      })
        .then(user => {
          setSpareParts(user.listedSpareParts?.map(lp => lp.sparePart) || [])
        })
        .catch(error => {
          enqueueSnackbar('Failed to load spare parts', { variant: 'error' })
        })
    }
  }, [userId])

  const showModal = (sparePart?: Model.SparePart) => {
    setEditingSparePart(sparePart || null)
    form.setFieldsValue(sparePart || { name: '', description: '', price: 0 })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingSparePart(null)
  }

  const handleSave = async (values: Partial<Model.SparePart>) => {
    try {
      if (editingSparePart) {
        await Api.SparePart.updateOne(editingSparePart.id, values)
        enqueueSnackbar('Spare part updated successfully', {
          variant: 'success',
        })
      } else {
        const newSparePart = await Api.SparePart.createOneByOwnerId(
          userId!,
          values,
        )
        setSpareParts([...spareParts, newSparePart])
        enqueueSnackbar('Spare part created successfully', {
          variant: 'success',
        })
      }
      setIsModalVisible(false)
      setEditingSparePart(null)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to save spare part', { variant: 'error' })
    }
  }

  const handleDelete = async (sparePartId: string) => {
    try {
      await Api.SparePart.deleteOne(sparePartId)
      setSpareParts(spareParts.filter(sp => sp.id !== sparePartId))
      enqueueSnackbar('Spare part deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete spare part', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Listed Spare Parts</Title>
      <Text>List, update, or remove your spare parts for sale.</Text>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Spare Part
        </Button>
      </Space>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={spareParts}
        renderItem={sparePart => (
          <List.Item>
            <Card
              title={sparePart.name}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => showModal(sparePart)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(sparePart.id)}
                />,
              ]}
            >
              <p>{sparePart.description}</p>
              <p>Price: ${sparePart.price}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={editingSparePart ? 'Edit Spare Part' : 'Add Spare Part'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the description' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingSparePart ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
