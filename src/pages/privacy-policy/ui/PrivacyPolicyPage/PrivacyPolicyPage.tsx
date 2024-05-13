import { Trans } from '@/src/shared/components/Trans'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import { PoliciesLayout } from '@/src/widgets/policies-layout'

export const PrivacyPolicyPage = () => {
  const { t } = useTranslation()

  return (
    <PoliciesLayout title={t.pages.policies.policy.title}>
      <Trans
        tags={{
          1: content => <Typography as={'p'}>{content}</Typography>,
          2: content => <Typography as={'p'}>{content}</Typography>,
          3: content => <Typography as={'p'}>{content}</Typography>,
        }}
        text={t.pages.policies.policy.welcomeText}
      />

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.infoTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.infoText}</Typography>
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.logTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.logText}</Typography>
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.cookieTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.cookieText}</Typography>
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.providersTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.providersText}</Typography>
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.securityTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.securityText}</Typography>
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.policy.childrenTitle}
        </Typography>
        <Typography as={'p'}>{t.pages.policies.policy.childrenText}</Typography>
      </section>
    </PoliciesLayout>
  )
}
