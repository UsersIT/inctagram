import { gitHubAuth } from '@/src/features/auth/gitHubAuth/gitHubAuth'
import { GitHub } from '@/src/shared/assets/icons'
import { Button } from '@/src/shared/ui'

export const GitHubAuthButton = () => {
  return (
    <Button onClick={gitHubAuth} style={{ color: 'var(--color-text-primary)' }} variant={'text'}>
      <GitHub height={36} viewBox={'0 0 24 24'} width={36} />
    </Button>
  )
}
