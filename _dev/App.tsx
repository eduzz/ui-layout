import { useCallback, useEffect } from 'react';

import {
  MessageOutlined,
  BellOutlined,
  NotificationOutlined,
  ExperimentOutlined,
  WhatsAppOutlined,
  MailOutlined
} from '@ant-design/icons';

import Layout from '..';
import { useAppLoader } from '../AppLoader/context';
import Avatar from '../Avatar';

const { Sidebar, Topbar, Content } = Layout;
const { Item, Group, GroupWithGroupSwitcher } = Sidebar;

function App() {
  const onSearchEnter = useCallback((search: string, clear: () => void) => {
    console.log({ search });
    clear();
  }, []);

  const loaderOptions = useAppLoader();

  useEffect(() => {
    setTimeout(() => loaderOptions.hide(), 1000);
  }, [loaderOptions]);

  return (
    <>
      <Layout mode='light' persistMode={true}>
        <Topbar
          currentApplication='orbita'
          user={{
            name: 'QA-ORBITA-NAO-ALTERAR-NAO-ALTERAR',
            belt: 'Red Belt',
            tag: 'unity',
            supportId: 1,
            isSupport: true,
            avatar: 'https://cdn.testzz.ninja/myeduzz/upload/3c/8e/3c8e5fc487944315a4ccdc3d95e6bda7',
            ssid: '0000aaaa-11bb-22cc-33dd-444444eeeeee'
          }}
          startChildren={<div>sou filho</div>}
        >
          <Topbar.UnitySupportChat />
          <Topbar.HyperflowSupportChat
            currentUser={{
              tag: 'unity',
              belt: 'Red Belt',
              isClubeBlack: false,
              id: 1,
              name: 'QA-ORBITA-NAO-ALTERAR-NAO-ALTERAR',
              email: 'email@email.com',
              isAccessPolicy: true,
              originalUserId: 1,
              originalUserName: 'QA-ORBITA-NAO-ALTERAR-NAO-ALTERAR',
              originalUserEmail: 'email@email.com'
            }}
            hyperflowConfig={{
              chatBlackID: 'bla',
              chatEliteID: 'bla',
              chatUnityID: 'bla',
              flowId: 'bla',
              origin: 'blinket'
            }}
            accountsJwt={() => Promise.resolve('')}
            hyperflowJwt=''
          />

          <Topbar.Search onEnter={onSearchEnter} />
          <Topbar.ModeSwitcher />
          <Topbar.Action badgeDot icon={<ExperimentOutlined />} tooltip='Experiment' />
          <Topbar.Action badgeCount={1} active icon={<NotificationOutlined size={25} />} />
          <Topbar.Action badgeCount={999} icon={<MessageOutlined />} label='Chat' />

          <Topbar.UserMenu>
            <Topbar.UserMenuItem as='a' icon={<BellOutlined />}>
              Meus Dados
            </Topbar.UserMenuItem>
            <Topbar.UserMenuItem icon={<NotificationOutlined />}>Minhas Compras</Topbar.UserMenuItem>

            <Topbar.UserMenuDivider />

            <Topbar.UserMenuGroup label='Contas:'>
              <Topbar.UserMenuItem disabled href='http://google.com' target='_blank' icon={<Avatar>AB</Avatar>}>
                John
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem href='http://google.com' target='_blank' icon={<Avatar>John</Avatar>}>
                John
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem href='http://google.com' target='_blank' icon={<Avatar>John Doe</Avatar>}>
                John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem>John Doe 2</Topbar.UserMenuItem>
            </Topbar.UserMenuGroup>

            <Topbar.UserMenuDivider />
            <Topbar.UserMenuItem>Sair</Topbar.UserMenuItem>
          </Topbar.UserMenu>
        </Topbar>

        <Sidebar currentLocation={location.pathname}>
          <Group>
            <Item isActive={true}>Resumo</Item>
          </Group>

          <Group>
            <Item isExternal>Relatórios</Item>
            <Item target='_blank'>Financeiro</Item>
            <Item>Soluções</Item>
          </Group>

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

          <Group label='Submenu'>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Group>

          <Group label='Configurações'>
            <Item>Central de Notificações</Item>
            <Item>Configurações</Item>
          </Group>
        </Sidebar>

        <Content>
          <img src='https://picsum.photos/800/300' className='uizz-layout-w-full' />
          <p className='uizz-layout-text-content-title'>Teste</p>
        </Content>
      </Layout>
    </>
  );
}

export default App;
