# Eduzz UI

UI padrão das aplicações, aqui você vai encontrar:

* [Layout](#layout)
* [App Loader](#app-loader)

# Layout

Estrutura padrão das aplicações.

## Importação

```ts
import Layout from '@eduzz/ui-layout';

// ou
import Layout from '@eduzz/ui-layout';
import Sidebar from '@eduzz/ui-layout/Sidebar';
import Topbar from '@eduzz/ui-layout/Topbar';
import Content from '@eduzz/ui-layout/Content';
```

## Estrutura base

```jsx
<Layout>
  <Layout.Topbar />
  <Layout.Sidebar />
  <Layout.Content />
</Layout>
```

## Desestruturando

Para simplificar a escrita do código, você pode desestruturar os componentes.

```jsx
import Layout from '@eduzz/ui-layout';

const { Sidebar, Topbar, Content } = Layout;
const { Item, Group, GroupWithGroupSwitcher } = Sidebar;

function CustomLayout() {
  return (
    <Layout>
      <Topbar {...topbarProps}>
        {...}
      </Topbar>

      <Sidebar {...sidebarProps}>
        {...}
      </Sidebar>

      <Content>
        {...}
      </Content>
    </Layout>
  );
}

export default CustomLayout;
```

## Exemplo

```jsx
import { NavLink, useLocation } from 'react-router-dom';

const { Sidebar, Topbar, Content } = Layout;
const { Item, Group, GroupWithGroupSwitcher } = Sidebar;

function MyComponent() {
  const location = useLocation();

  return (
    <Layout>
      <Topbar
        currentApplication='orbita'
        user={{
          name: 'Houston User',
          belt: 'Black Belt',
          avatar: 'https://picsum.photos/200',
          tag: 'unity'
        }}
      >
        <Topbar.UnitySupportChat token='...token gerado pelo servidor' />

        <Topbar.Action icon={<NotificationOutline size={25} />} label='Notificações' />
        <Topbar.Action icon={<InfoChatOutline size={25} />} />

        <Topbar.UserMenu>
          <Topbar.UserMenuItem>Meus Dados</Topbar.UserMenuItem>
          <Topbar.UserMenuItem>Minhas Compras</Topbar.UserMenuItem>

          <Topbar.UserMenuGroup label='Contas:'>
            <Topbar.UserMenuItem href='http://google.com' target='_blank'>
              John Doe
            </Topbar.UserMenuItem>
            <Topbar.UserMenuItem disabled>John Doe 2</Topbar.UserMenuItem>
          </Topbar.UserMenuGroup>

          <Topbar.UserMenuDivider />

          <Topbar.UserMenuItem>Sair</Topbar.UserMenuItem>
        </Topbar.UserMenu>
      </Topbar>

      <Sidebar currentLocation={location.pathname}>
        <Item href='/agendamento'>Resumo</Item>

        <GroupWithGroupSwitcher
            label='Integrações'
            options={[
              {
                id: 'whatsapp',
                label: 'Whatsapp',
                icon: <WhatsAppOutlined />,
                items: [
                  <Item key={'option-1-item-1'} id='sidebar-option-1-item-1'>
                    Templates
                  </Item>,
                  <Item key={'option-1-item-2'} id='sidebar-option-1-item-2'>
                    Configurações
                  </Item>
                ]
              },
              {
                id: 'email',
                label: 'Email',
                icon: <MailOutlined />,
                items: [
                  <Item key={'option-2-item-1'} id='sidebar-option-2-item-1'>
                    Layout
                  </Item>,
                  <Item key={'option-2-item-2'} id='sidebar-option-2-item-2'>
                    Templates
                  </Item>,
                  <Item key={'option-2-item-3'} id='sidebar-option-2-item-3'>
                    Configurações
                  </Item>
                ]
              }
            ]}
          />

        <Group label='Agendamento'>
          <Item as={NavLink} to='/agendamento'>
            Evento
          </Item>
          <Item as={NavLink} to='/agendamento'>
            MasterMind
          </Item>
          <Item as={NavLink} to='/agendamento'>
            Lançamento
          </Item>
        </Group>

        <Item disabled>Marketplace</Item>
      </Sidebar>

      <Content>{/*Your content here*/}</Content>
    </Layout>
  );
}
```

## Props

### Layout props

| prop                    | tipo                                   | obrigatório | padrão    | descrição                                                                        |
|-------------------------|----------------------------------------|-------------|-----------|----------------------------------------------------------------------------------|
| mode                    | `'light' \| 'dark'`                    | `false`     | `'light'` | Modo (Dark ou Light mode)                                                        |
| persistMode             | `boolean`                              | `false`     | `false`   | Faz o modo (Dark ou Light mode) persistirem no localStorage como `eduzz-ui-mode` |
| acceptModeBySearchParam | `boolean`                              | `false`     | `false`   | Aceita receber `?eduzzMode=dark` na URL por exemplo, para definir o `mode`       |
| onModeChange            | `(newMode: 'light' \| 'dark') => void` | `false`     | -         | Função a ser executada toda vez que houver uma mudança de modo.                  |

### Topbar props

| prop               | tipo     | obrigatório | padrão | descrição                                                   |
|--------------------|----------|-------------|--------|-------------------------------------------------------------|
| logo               | `url`    | `false`     | -      | Url para o logo padrao.                                     |
| logoMobile         | `url`    | `false`     | -      | Url para o logo na versão mobile.                           |
| currentApplication | `string` | `false`     | -      | Aplicação que está sendo usada, para marcar no menu de apps |
| user               | `object` | `false`     | -      | Se existe um usuário logado, sem ele não terá o menu User   |

### Topbar.Action props

| prop     | tipo        | obrigatório | padrão  | descrição                                            |
|----------|-------------|-------------|---------|------------------------------------------------------|
| icon     | `ReactNode` | `true`      | -       | Icone, tamanho ideal 25                              |
| label    | `string`    | `false`     | -       |                                                      |
| isActive | `boolean`   | `false`     | `false` | Se o icone deve manter o estado de pressionado/ativo |
| onClick  | `function`  | `false`     | -       |                                                      |

### Topbar.UserMenuItem props

| prop     | tipo        | obrigatório | padrão | descrição               |
|----------|-------------|-------------|--------|-------------------------|
| icon     | `ReactNode` | `true`      | -      | Icone, tamanho ideal 25 |
| children | `string`    | `false`     | -      | Deve ser uma string     |
| disabled | `boolean`   | `false`     | -      |                         |
| onClick  | `function`  | `false`     | -      |                         |

### Topbar.UserMenuGroup props

| prop     | tipo        | obrigatório | padrão | descrição |
|----------|-------------|-------------|--------|-----------|
| label    | `string`    | `true`      | -      |           |
| children | `ReactNode` | `true`      | -      |           |

### Topbar.UnitySupportChat props

| prop  | tipo     | obrigatório | padrão | descrição                                         |
|-------|----------|-------------|--------|---------------------------------------------------|
| token | `string` | `false`     | -      | Token gerado pelo servidor para uso do LiveHelper |

### Topbar.HyperflowSupportChat props

| prop            | tipo                    | obrigatório | padrão | descrição                                            |
|-----------------|-------------------------|-------------|--------|------------------------------------------------------|
| accountsJwt     | `() => Promise<string>` | `true`      | -      | JWT gerado a partir do accounts                      |
| hyperflowConfig | `HyperflowConfig`       | `true`      | -      | Tokens dos canais do Hyperflow                       |
| currentUser     | `CurrentUser`           | `true`      | -      | Dados do usuário que serão enviados para o Hyperflow |
| hyperflowJwt    | `string`                | `true`      | -      | JWT gerado a partir do secret da Hyperflow           |

```ts
export type CurrentUser = {
  tag: string;
  belt: string;
  isClubeBlack: boolean;
  id: number;
  name: string;
  email: string;
  isAccessPolicy: boolean;
} & (
  | {
      isAccessPolicy: true;
      originalUserId: number;
      originalUserName: string;
      originalUserEmail: string;
    }
  | { isAccessPolicy: false }
);

type HyperflowConfig = {
  chatUnityID: string;
  chatBlackID: string;
  chatEliteID: string;
  flowId: string;
  origin: 'blinket' | 'checkout' | 'myeduzz' | 'nutror' | 'orbitpages' | 'safevideo';
};
```

Documentação de apoio: [Hyperflow](https://www.notion.so/eduzz/Doc-Implementa-o-do-Chat-Hyperflow-982b8fc935ee4f59974401df8668bda7)

### Topbar.ModeSwitcher props

| prop               | tipo     | obrigatório | padrão | descrição                                                   |
|--------------------|----------|-------------|--------|-------------------------------------------------------------|
| tooltip| `string`| `false`| `'Tema'`|  Texto para o tooltip do botão. mode |
| badgeDot| `boolean`| `false`| `false`| Se um badgeDot deve ser adicionado ao botão .|

### Sidebar props

| prop            | tipo     | obrigatório | padrão | descrição                                |
|-----------------|----------|-------------|--------|------------------------------------------|
| currentLocation | `string` | `false`     | -      | Caminho de localização atual (pathname). |

### Sidebar.Item props

| prop     | tipo                | obrigatório | padrão  | descrição                                                                   |
|----------|---------------------|-------------|---------|-----------------------------------------------------------------------------|
| as       | `React.ElementType` | `false`     | -       | Componente que envolve o item.                                              |
| `any`    | `any`               | `false`     | -       | Qualquer prop que o `as` receba                                             |
| isActive | `boolean`           | `false`     | `false` | Irá usar o `currentLocation` fornecido para tentar ver se está ativo ou não |
| tabIndex | `number`            | `false`     | -       |                                                                             |
| disabled | `boolean`           | `false`     | -       |                                                                             |
| onClick  | `function`          | `false`     | -       |                                                                             |

### Sidebar.Group props

| prop     | tipo              | obrigatório | padrão | descrição |
|----------|-------------------|-------------|--------|-----------|
| label    | `React.ReactNode` | `false`     | -      | -         |
| tabIndex | `number`          | `false`     | -      |           |

### Sidebar.GroupWithGroupSwitcher props

| prop      | tipo                                        | obrigatório | padrão | descrição                                                                                             |
|-----------|---------------------------------------------|-------------|--------|-------------------------------------------------------------------------------------------------------|
| id        | `string`                                    | `false`     | -      | Identificador único para o elemento raiz (HTML `<li>`).                                             |
| label     | `ReactNode`                                 | `false`     | -      | Label ou título do grupo, exibido acima das opções do seletor.                                        |
| options   | `SidebarGroupWithGroupSwitcherOption[]`     | `true`      | -      | Array de opções que serão renderizadas no grupo. Cada opção define um conjunto de itens e atributos.   |
| className | `string`                                    | `false`     | -      | Classe CSS adicional para customização do componente.                                               |
| defaultOptionId | `string `                             | `false`     | -      | Valor padrão selecionado, caso não seja informado, será utilizada a primeira opção como padrão |
| onChangeOption | `(option: SidebarGroupWithGroupSwitcherOption) => void` | `false` | -      | Função que será chamada como callback ao alterar a opção |

### SidebarGroupWithGroupSwitcherOption

| prop  | tipo           | obrigatório | padrão | descrição                                                                              |
|-------|----------------|-------------|--------|----------------------------------------------------------------------------------------|
| id    | `string`       | `true`      | -      | Identificador único da opção.                                                          |
| label | `string`       | `true`      | -      | Texto que representa o rótulo da opção. Pode ser um nome ou título descritivo.         |
| icon  | `ReactNode`    | `false`     | -      | Elemento opcional que pode conter um ícone ou qualquer outro elemento visual.          |
| items | `ReactNode[]`  | `true`      | -      | Conjunto de itens (children) que serão renderizados quando a opção estiver selecionada. |


### Content props

| prop           | tipo      | obrigatório | padrão | descrição        |
|----------------|-----------|-------------|--------|------------------|
| disablePadding | `boolean` | `false`     | -      | Remove o padding |

# App Loader

Loader de aplicação padrão.

## Importação

```js
import AppLoader, { useAppLoader } from '@eduzz/ui-layout';
```

## Exemplo

Coloque no momento de `createRoot` e use o lazy para aparecer o loader antes da aplicação. Coloque o minimo de imports nesse arquivo para carregar o mais rapido possível.

```jsx
import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import AppLoader from '@eduzz/ui-layout'; 

const App = lazy(() => import('./App'));

createRoot(document.getElementById('app') as HTMLElement).render(
  <AppLoader>
    <App />
  </AppLoader>
);

// App.tsx
import { useEffect } from 'react';
import { useAppLoader } from '@eduzz/ui-layout';

function App() {
  const appLoader = useAppLoader();

  useEffect(() => {
    // Faça o que precisar ser feito e entao chame o `hide`
    appLoader.hide();
    // Caso queira aparecer novamente
    appLoader.show();
    // Se algo acontecer pode mostrar uma mensagem de erro
    appLoader.error(new Error(), () => console.log('Tente novamente'));
  }, []);

  return <div />
}
```

## Props

### AppLoader props

| prop         | tipo             | obrigatório | padrão       |
|--------------|------------------|-------------|--------------|
| logo         | `url\|ReactNode` | `false`     | `Eduzz Logo` |
| logoDarkMode | `url\|ReactNode` | `false`     | `Eduzz Logo` |
