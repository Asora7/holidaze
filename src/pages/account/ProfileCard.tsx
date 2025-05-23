// src/pages/account/ProfileCard.tsx
import { useState, useEffect } from 'react'
import { Card, Button, Form, Spinner, Image, Stack } from 'react-bootstrap'

interface ProfileCardProps {
  profile: { id: string; name: string; email: string; avatar?: string }
  onAvatarChange?: (url: string) => void  // optional callback
  onSaveAvatar?: (url: string) => void    // optional callback
}

export default function ProfileCard({
  profile,
  onAvatarChange,
  onSaveAvatar,
}: ProfileCardProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [editing, setEditing] = useState(false)

  // Load from localStorage (or fallback to profile.avatar) once
  useEffect(() => {
    const key = `avatarUrl_${profile.id}`
    const saved = localStorage.getItem(key)
    if (saved) {
      setAvatarUrl(saved)
      onAvatarChange?.(saved)
    } else if (profile.avatar) {
      setAvatarUrl(profile.avatar)
      onAvatarChange?.(profile.avatar)
    }
  }, [profile.id, profile.avatar, onAvatarChange])

  const handleSave = () => {
    const key = `avatarUrl_${profile.id}`
    localStorage.setItem(key, avatarUrl)
    onSaveAvatar?.(avatarUrl)
    setEditing(false)
  }

  if (!profile) {
    return (
      <Card className="text-center shadow-sm">
        <Card.Body>
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card
      className="h-100 shadow-sm"
      style={{ transition: 'transform .15s ease' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <Card.Body className="d-flex flex-column align-items-center p-4">
        <Image
          src={avatarUrl || '/images/avatar-placeholder.png'}
          roundedCircle
          width={128}
          height={128}
          className="mb-3 border"
        />

        {!editing ? (
          <Button
            variant="outline-secondary"
            size="sm"
            className="w-50 mb-3"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            size="sm"
            className="w-50 mb-3"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
        )}

        <Card.Title className="mb-1">{profile.name}</Card.Title>
        <Card.Text className="text-muted mb-3">{profile.email}</Card.Text>

        {editing && (
          <Form className="w-100 mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="url"
                value={avatarUrl}
                placeholder="https://…"
                onChange={e => setAvatarUrl(e.currentTarget.value)}
              />
            </Form.Group>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Card.Body>
    </Card>
  )
}
