import { CalendarDefaultTheme } from '@uselessdev/datepicker'
import { extendTheme } from '@chakra-ui/react'

export const CalendarTheme = extendTheme(CalendarDefaultTheme, {
  components: {
    Calendar: {
      parts: ['calendar'],
      baseStyle: {
        calendar: {
        //   borderWidth: '6px',
        //   borderColor: 'pink.400',
          rounded: '8px',
          shadow: 'none',
        //   boxShadow: '32px 16px 0 6px #3B4DCC'
            
        },
      },
      
    },
    CalendarDay : {
      baseStyle: {
        rounded: 'none',
        bgColor: 'transparent',
        _hover: {
          bgColor: 'gray.100'
        },
        _disabled: {
          bgColor:'black',
          color: 'gray.200',
          _hover: {
            bgColor:'black',
            color: 'gray.200',
          }
        },
        
      },
      sizes: {
        sm: {
          h: 8
        }
      },
      variants: {
        selected: {
          bgColor: 'gray.200',
          color: 'black',
          _hover: {
            bgColor: '#FFB7A4'
          }
        },
        range: {
          bgColor: 'gray.200',
          color: 'black',
          _hover: {
            bgColor: 'gray.100',
            color:"black"
          },
          
        },
        highlighted:{
          bgColor:'#FF4A1C',
          color:'white',
          _hover:{
            bgColor:'#FF4A1C'
          }
        },
        outside: {
          bgColor:'black',
          color: 'gray.200',
        },
        today: {
          bgColor: 'red',
          _hover: {
            bgColor: 'gray.300'
          }
        }
      },
      defaultProps: {
        size: 'sm'
      }
    },
    CalendarControl: {
      parts: ['button'],

      baseStyle: {
        button: {
          h: 6,
          px: 2,
          rounded: 'none',
          fontSize: 'sm',
          color: 'white',
          bgColor: 'gray.300',

          _hover: {
            bgColor: '#FF4A1C',
          },

          _focus: {
            outline: 'none',
          },
        },
      },
    }
  },
})