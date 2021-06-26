import React, { useState } from 'react'
import Container from '../../components/Container'
import { FormAvatar } from './components/Avatar'
import { FormProfile } from './components/Form'
import { breadcrumbUpdate } from './domain/breadcrumb'
import { useAuth } from '../../hooks/auth'
import { ProfileContainer } from './styles'

const ProfileUpdate = (): JSX.Element => {
  const { user } = useAuth()

  useState<{
    id: string
    name: string
    email: string
    username: string
    password: string
    avatar_url: string
  }>()

  return (
    <Container
      pageTitle="Perfil"
      portletTitle="Editar Perfil"
      breadcrumb={breadcrumbUpdate}
    >
      <ProfileContainer className="form-body">
        <FormAvatar avatarUrl={user.avatar_url} />
        <FormProfile
          typeForm="update"
          initialValues={{
            ...user
          }}
        />
      </ProfileContainer>
    </Container>
  )
}

export default ProfileUpdate