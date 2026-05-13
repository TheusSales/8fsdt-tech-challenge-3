import styled from 'styled-components'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Container } from './components/Container'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'

// Tela temporária de "kitchen sink" do design system — mostra os componentes
// base funcionando. Vai ser substituída pela lista de posts quando
// implementarmos o roteamento.
export function App() {
  return (
    <>
      <Header />
      <Container>
        <Stack>
          <Title>Design System — preview</Title>
          <Subtitle>
            Componentes base do projeto. Edite <code>src/styles/theme.ts</code>{' '}
            para ajustar cores, espaços e tipografia.
          </Subtitle>

          <Section>
            <SectionTitle>Botões</SectionTitle>
            <Row>
              <Button>Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="danger">Excluir</Button>
              <Button disabled>Desabilitado</Button>
            </Row>
          </Section>

          <Section>
            <SectionTitle>Formulário</SectionTitle>
            <Card>
              <FormStack>
                <Input label="Título" placeholder="Digite o título do post" />
                <Input label="Autor" placeholder="Seu nome" />
                <Textarea label="Conteúdo" placeholder="Escreva o conteúdo..." />
                <Row>
                  <Button variant="secondary">Cancelar</Button>
                  <Button>Publicar</Button>
                </Row>
              </FormStack>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Card de post</SectionTitle>
            <Card>
              <PostTitle>Exemplo: Introdução ao React</PostTitle>
              <PostMeta>por Prof. Fulano</PostMeta>
              <PostExcerpt>
                Breve descrição do post em duas linhas no máximo, ilustrando
                como o conteúdo aparece na listagem da página inicial.
              </PostExcerpt>
              <Row>
                <Button variant="secondary">Ler &gt;</Button>
              </Row>
            </Card>
          </Section>
        </Stack>
      </Container>
    </>
  )
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: ${({ theme }) => theme.colors.primary};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};

  code {
    background: ${({ theme }) => theme.colors.surface};
    padding: 0 ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
`

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const PostMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
