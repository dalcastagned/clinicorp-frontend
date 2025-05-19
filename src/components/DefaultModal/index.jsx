import { Button, CircularProgress, Dialog, Tooltip, useColorScheme } from '@mui/material'
import React from 'react'
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
    <Dialog open={open} onClose={handleClose} maxWidth='xl' aria-modal='true'>
      <S.Container>
        <S.Title component='h2'>{title}</S.Title>

        {handleClose && (
          <Tooltip title='Fechar modal'>
            <S.IconButtonS onClick={handleClose} aria-label='Fechar modal'>
              <MdClose aria-hidden='true' />
            </S.IconButtonS>
          </Tooltip>
        )}

        <S.Children>{children}</S.Children>

        {handleSubmit && (
          <S.Footer mode={mode}>
            <Button
              variant='contained'
              size='large'
              type='button'
              onClick={handleSubmit}
              fullWidth
              disabled={disableSubmit || submitLoading}
              aria-busy={submitLoading ? 'true' : 'false'}
            >
              {submitLoading ? (
                <CircularProgress
                  size={24.5}
                  sx={{ svg: { color: 'white' } }}
                  aria-label='Salvando dados'
                />
              ) : (
                submitText || 'Salvar'
              )}
            </Button>
          </S.Footer>
        )}
      </S.Container>
    </Dialog>
  )
}
