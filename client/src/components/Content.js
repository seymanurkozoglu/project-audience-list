import React, { useEffect, useState } from "react";
import { Table, Input, Select, Image, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Content() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [tagList, setTagList] = useState();
  const [audienceList, setAudienceList] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [selectionTag, setSelectionTag] = useState();
  const [selectionStatus, setSelectionStatus] = useState();

  const columns = [
    {
      title: <p className="table-column-title">Audience Name</p>,
      dataIndex: "audiencename",
    },
    {
      title: <p className="table-column-title">Tags</p>,
      dataIndex: "tags",
    },
    {
      title: <p className="table-column-title">Status</p>,
      dataIndex: "status",
    },
    {
      title: <p className="table-column-title">Action</p>,
      dataIndex: "action",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  async function getTagsList() {
    try {
      const res = await axios.get("/tags");
      let tagsArray = [];
      if (res.data && res.data.length > 0) {
        res.data.map((item) => {
          tagsArray.push({
            value: item.name,
            label: item.name,
          });
        });
      }
      setTagList(tagsArray);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAudienceList() {
    try {
          const res = await axios.get("/audience-list");
          if (res.data && res.data.length > 0) setAudienceList(res.data);
          else setAudienceList([]);
    } catch (err) {
      console.log(err);
    }
  }

  async function getSearchResult() {
    if(searchValue !== undefined || selectionTag !== undefined || selectionStatus !== undefined){
    try {
      const res = await axios.get(`/audience-list-search?search=${searchValue}&tag=${selectionTag}&status=${selectionStatus}`);
      if (res.data && res.data.length > 0) setAudienceList(res.data);
      else setAudienceList([]);
    } catch (err) {
      console.log(err);
    }
  }
  }

  useEffect(() => {
    getTagsList();
    getAudienceList();
  }, []);

  useEffect(()=>{
    getSearchResult();
  },[searchValue,selectionStatus,selectionTag])

  return (
    <div className="content">
      <div className="header">
        <div className="header-text-box">
          <p className="cs-title">Welcome, Amanda</p>
          <p className="cs-desc">Tue, 07 June 2022</p>
        </div>
        <div className="header-icon-bar">
          <Avatar
            className="avatar-notification"
            shape="square"
            icon={<Image src="/image/notification-bing.svg" preview={false} />}
          />
          <Avatar
            className="avatar-gallery"
            shape="square"
            icon={<Image src="/image/gallery.svg" preview={false} />}
          />
        </div>
      </div>
      <div className="filter-bar">
        <p className="cs-title">Audience List</p>
        <div className="select-bar">
          <Input 
              defaultValue={""}
              placeholder="Search" 
              prefix={<SearchOutlined />} 
              onChange={(item) => {
                setSearchValue(item.target.value);
              }}
          />
          <Select
            className="select-tags"
            placeholder="Select Tags"
            onChange={(optionTags) => {
              setSelectionTag(optionTags);
            }}
            options={tagList}
          />
          <Select
            className="select-status"
            placeholder="All Status"
            onChange={(optionStatus) => {
              setSelectionStatus(optionStatus);
            }}
            options={[
              {
                value: "active",
                label: "Active",
              },
              {
                value: "passive",
                label: "Passive",
              },
            ]}
          />
        </div>
      </div>

      <div className="table-main">
        <Table
          className="audince-list-table"
          scroll={{ x: true }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          //pagination={false}
          columns={columns}
          dataSource={audienceList.map((item) => ({
            key: item.id,
            audiencename: (
              <div className="table-img">
                <Avatar
                  className="avatar-gallery"
                  shape="square"
                  icon={<Image src="/image/gallery.svg" preview={false} />}
                />
                <p className="cs-title">{item.name}</p>
              </div>
            ),
            tags: <p className="cs-tags">{(item.tags).join(",")}</p>,
            status: <p className="cs-status">{item.status}</p>,
            action: "...",
          }))}
        />
      </div>
    </div>
  );
}
