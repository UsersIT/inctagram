import { Trans } from '@/src/shared/components/Trans'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import { PoliciesLayout } from '@/src/widgets/policies-layout'

export const TermsOfServicePage = () => {
  const { t } = useTranslation()

  return (
    <PoliciesLayout title={t.pages.policies.terms.title}>
      <Trans
        tags={{
          1: content => <Typography as={'p'}>{content}</Typography>,
          2: content => <Typography as={'p'}>{content}</Typography>,
          3: content => <Typography as={'p'}>{content}</Typography>,
          4: content => <Typography as={'p'}>{content}</Typography>,
        }}
        text={t.pages.policies.terms.welcomeText}
      />

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.terms.contentTitle}
        </Typography>
        <Trans
          tags={{
            1: content => <Typography as={'p'}>{content}</Typography>,
            2: content => <Typography as={'p'}>{content}</Typography>,
            3: content => <Typography as={'p'}>{content}</Typography>,
          }}
          text={t.pages.policies.terms.contentText}
        />
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.terms.accountsTitle}
        </Typography>
        <Trans
          tags={{
            1: content => <Typography as={'p'}>{content}</Typography>,
            2: content => <Typography as={'p'}>{content}</Typography>,
            3: content => <Typography as={'p'}>{content}</Typography>,
          }}
          text={t.pages.policies.terms.accountsText}
        />
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.terms.linksTitle}
        </Typography>
        <Trans
          tags={{
            1: content => <Typography as={'p'}>{content}</Typography>,
            2: content => <Typography as={'p'}>{content}</Typography>,
            3: content => <Typography as={'p'}>{content}</Typography>,
          }}
          text={t.pages.policies.terms.linksText}
        />
      </section>

      <section>
        <Typography as={'h2'} variant={'h2'}>
          {t.pages.policies.terms.terminationTitle}
        </Typography>
        <Trans
          tags={{
            1: content => <Typography as={'p'}>{content}</Typography>,
            2: content => <Typography as={'p'}>{content}</Typography>,
            3: content => <Typography as={'p'}>{content}</Typography>,
            4: content => <Typography as={'p'}>{content}</Typography>,
          }}
          text={t.pages.policies.terms.terminationText}
        />
      </section>
    </PoliciesLayout>
  )
}
