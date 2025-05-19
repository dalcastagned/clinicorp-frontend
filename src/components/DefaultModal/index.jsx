import { Button, CircularProgress, Dialog, Tooltip, useColorScheme } from '@mui/material'
import { MdClose } from 'react-icons/md'

import * as S from './styles'

export const DefaultModal = ({
  open,
  handleClose,
  title,
  submitText,
  handleSubmit,
  submitLoading,
  children,
  disableSubmit,
}) => {
  const { mode } = useColorScheme()

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xl'>
      <S.Container>
        <S.Title>{title}</S.Title>
        {handleClose && (
          <Tooltip title='Fechar'>
            <S.IconButtonS onClick={handleClose}>
              <MdClose />
            </S.IconButtonS>
          </Tooltip>
        )}
        <S.Children>{children}</S.Children>
        {handleSubmit && (
          <S.Footer mode={mode}>
            {handleSubmit && (
              <Button
                variant='contained'
                size='large'
                type='submit'
                onClick={handleSubmit}
                fullWidth
                disabled={disableSubmit}
              >
                {!submitLoading ? (
                  submitText || 'Salvar'
                ) : (
                  <CircularProgress size={24.5} color='inherit' sx={{ svg: { color: 'white' } }} />
                )}
              </Button>
            )}
          </S.Footer>
        )}
      </S.Container>
    </Dialog>
  )
}
