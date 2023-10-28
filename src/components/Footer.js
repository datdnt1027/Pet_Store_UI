import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function LargeWithAppLinksAndSocial() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Website</ListHeader>
            <Box as="a" href={'#'}>
            Dành Cho Chó
            </Box>
            <Box as="a" href={'#'}>
            Dành Cho Mèo
            </Box>
            <Box as="a" href={'#'}>
            Thương Hiệu
            </Box>
            <Box as="a" href={'#'}>
            Bộ Sưu Tập
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Petcal Shop</ListHeader>
            <Box as="a" href={'#'}>
            Giới Thiệu
            </Box>
            <Box as="a" href={'#'}>
            Điều Khoản Sử Dụng
            </Box>
            <Box as="a" href={'#'}>
            Tuyển Dụng
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Hỗ Trợ Khách Hàng</ListHeader>
            <Box as="a" href={'#'}>
            Chính Sách Đổi Trả Hàng
            </Box>
            <Box as="a" href={'#'}>
            Phương Thức Vận Chuyển
            </Box>
            <Box as="a" href={'#'}>
            Chính Sách Bảo Mật
            </Box>
            <Box as="a" href={'#'}>
            Phương Thức Thanh Toán
            </Box>
            <Box as="a" href={'#'}>
            Chính Sách Hoàn Tiền
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Liên hệ</ListHeader>
            <Box as="a" >
            Nguyễn Khắc Duy
            </Box>
            <Box as="a" >
            Đặng Nguyễn Thiên Đạt
            </Box>
            
            <Box as="a" >
            Đại Học Sư Phạm Kỹ thuật
            </Box>
            <Box as="a" >
            Số 1 Võ Văn Ngân Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh
            </Box>
          </Stack>

        </SimpleGrid>

        
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2022 Chakra Templates. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Facebook'} href={'#'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}