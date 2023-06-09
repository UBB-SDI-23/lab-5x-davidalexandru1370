using mpp1.Model;
using mpp1.Model.DTO;

namespace mpp1.SignalR;

public interface IMessageHub
{
    public Task SendMessageToEveryone(MessageDTO message);
}