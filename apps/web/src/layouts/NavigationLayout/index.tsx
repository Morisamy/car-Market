import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row, ConfigProvider, Button, Menu, Table, Input, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState, useEffect } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Api } from '@web/domain'
import { SearchOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const authentication = useAuthentication()
  const user = authentication?.user as Model.User
  const { isMobile } = useDesignSystem()

  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [data, setData] = useState<Model.User[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ar' : 'en'))
  }

  const translations = {
    en: {
      home: 'Home',
      cart: 'Cart',
      rentalHistory: 'Rental History',
      purchaseHistory: 'Purchase History',
      manageListedCars: 'Manage Listed Cars',
      manageListedSpareParts: 'Manage Listed Spare Parts',
      profile: 'Profile',
      notifications: 'Notifications',
      carDetails: 'Car Details',
      sparePartDetails: 'Spare Part Details',
      export: 'Export',
      print: 'Print',
    },
    ar: {
      home: 'الصفحة الرئيسية',
      cart: 'عربة التسوق',
      rentalHistory: 'تاريخ الإيجار',
      purchaseHistory: 'تاريخ الشراء',
      manageListedCars: 'إدارة السيارات المدرجة',
      manageListedSpareParts: 'إدارة قطع الغيار المدرجة',
      profile: 'الملف الشخصي',
      notifications: 'الإشعارات',
      carDetails: 'تفاصيل السيارة',
      sparePartDetails: 'تفاصيل قطع الغيار',
      export: 'تصدير',
      print: 'طباعة',
    },
  }

  const t = translations[language]

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  let itemsLeftbar = [
    {
      key: '/home',
      label: t.home,
      onClick: () => goTo('/home'),
    },
    {
      key: '/cart',
      label: t.cart,
      onClick: () => goTo('/cart'),
    },
    {
      key: '/rental-history',
      label: t.rentalHistory,
      onClick: () => goTo('/rental-history'),
    },
    {
      key: '/purchase-history',
      label: t.purchaseHistory,
      onClick: () => goTo('/purchase-history'),
    },
    {
      key: '/my-listed-cars',
      label: t.manageListedCars,
      onClick: () => goTo('/my-listed-cars'),
    },
    {
      key: '/my-listed-spare-parts',
      label: t.manageListedSpareParts,
      onClick: () => goTo('/my-listed-spare-parts'),
    },
  ]

  let itemsUser = [
    {
      key: 'profile',
      label: t.profile,
      onClick: () => goToUserPage(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: t.notifications,
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
  ]

  let itemsSubNavigation = [
    {
      key: '/home',
      label: t.home,
    },
    {
      key: '/cars/:carId',
      label: t.carDetails,
    },
    {
      key: '/spare-parts/:sparePartId',
      label: t.sparePartDetails,
    },
    {
      key: '/cart',
      label: t.cart,
    },
    {
      key: '/rental-history',
      label: t.rentalHistory,
    },
    {
      key: '/purchase-history',
      label: t.purchaseHistory,
    },
    {
      key: '/my-listed-cars',
      label: t.manageListedCars,
    },
    {
      key: '/my-listed-spare-parts',
      label: t.manageListedSpareParts,
    },
  ]

  const isLeftbar =
    (itemsLeftbar.length > 0 || itemsUser.length > 0) &&
    !isMobile &&
    authentication.isLoggedIn

  if (!authentication.isLoggedIn) {
    itemsLeftbar = []
    itemsUser = []
    itemsSubNavigation = []
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await Api.User.findMany()
      setData(result)
    }
    fetchData()
  }, [])

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <span>{text}</span>
      ) : (
        text
      ),
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#007bff',
          colorBgBase: '#343a40',
          colorTextBase: '#ffffff',
        },
      }}
    >
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />
              <Button onClick={toggleLanguage}>
                {language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              </Button>
              <Menu mode="horizontal">
                <Menu.Item key="home" onClick={() => goTo('/home')}>
                  {t.home}
                </Menu.Item>
                <Menu.Item key="profile" onClick={() => goToUserPage(RouterObject.route.PROFILE)}>
                  {t.profile}
                </Menu.Item>
                <Menu.Item key="notifications" onClick={() => goTo(RouterObject.route.NOTIFICATIONS)}>
                  {t.notifications}
                </Menu.Item>
              </Menu>
              <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                id="data-table"
                pagination={{ pageSize: 5 }}
              />
              <Button>
                {t.export}
              </Button>
              <Button>
                {t.print}
              </Button>
              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  )
}
